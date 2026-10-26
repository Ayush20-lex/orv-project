"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StarOrbCanvas({ className = "", style = {} }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth || 400;
    const h = container.offsetHeight || 400;

    // ── Scene & Camera ──────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Meshes ──────────────────────────────────────────────────────
    const outerGeo = new THREE.IcosahedronGeometry(1.85, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: "#82b1ff",
      wireframe: true,
      transparent: true,
      opacity: 0.52,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);

    const innerGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: "#ff4d4d",
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);

    const coreGeo = new THREE.SphereGeometry(0.4, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: "#82b1ff", transparent: true, opacity: 0.65 });
    const core = new THREE.Mesh(coreGeo, coreMat);

    const haloGeo = new THREE.SphereGeometry(0.78, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: "#82b1ff",
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);

    // Main group receives mouse-tilt rotation
    const mainGroup = new THREE.Group();
    mainGroup.add(outer, inner, core, halo);
    scene.add(mainGroup);

    // ── Particles ───────────────────────────────────────────────────
    const COUNT = 220;
    const pos   = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.5 + Math.random() * 1.2;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: "#82b1ff",
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.72,
    });
    const particles = new THREE.Points(particleGeo, particlesMat);
    scene.add(particles);

    // ── Lights ──────────────────────────────────────────────────────
    const blueLight = new THREE.PointLight("#82b1ff", 2.4, 12);
    const redLight  = new THREE.PointLight("#ff4d4d", 0.7, 7);
    redLight.position.set(2.5, -2, 1.5);
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.1);
    scene.add(blueLight, redLight, ambientLight);

    // ── Motion & Visibility Checks ──────────────────────────────────
    let isVisible = false;
    let isTabActive = typeof document !== "undefined" ? !document.hidden : true;
    const prefersReducedMotion = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    let mx = 0, my = 0;
    const onMouseMove = (e) => {
      if (prefersReducedMotion || !isVisible || !isTabActive) return;
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Animation Loop with Throttling / Pausing ───────────────────
    let t = 0;
    let raf = null;

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!isVisible || !isTabActive) {
        raf = null;
        return;
      }

      if (prefersReducedMotion) {
        renderFrame();
        raf = null;
        return;
      }

      raf = requestAnimationFrame(animate);
      t += 0.016;

      // Auto-rotation — each mesh gets its own axis for layered effect
      outer.rotation.y += 0.0028;
      outer.rotation.x += 0.0018;
      inner.rotation.y -= 0.0022;
      inner.rotation.z += 0.0014;
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Core + halo pulse (opposite phases)
      core.scale.setScalar(1 + Math.sin(t * 1.8)           * 0.10);
      halo.scale.setScalar(1 + Math.sin(t * 1.8 + Math.PI) * 0.06);

      // Mouse tilt on the whole group (lerped for smoothness)
      mainGroup.rotation.x += (my * 0.25 - mainGroup.rotation.x) * 0.04;
      mainGroup.rotation.y += (mx * 0.25 - mainGroup.rotation.y) * 0.04;

      renderFrame();
    };

    // Pause when offscreen
    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isTabActive && !raf) {
            animate();
          } else if (!isVisible && raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    } else {
      isVisible = true;
      animate();
    }

    // Pause when tab is hidden
    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isVisible && isTabActive && !raf) {
        animate();
      } else if (!isTabActive && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ── Resize with ResizeObserver ──────────────────────────────────
    let resizeObserver = null;
    const handleResize = (nw, nh) => {
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      if (prefersReducedMotion) {
        renderFrame();
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          handleResize(width, height);
        }
      });
      resizeObserver.observe(container);
    } else {
      const onResize = () => handleResize(container.offsetWidth, container.offsetHeight);
      window.addEventListener("resize", onResize);
    }

    // ── Cleanup ─────────────────────────────────────────────────────
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (observer) observer.disconnect();

      // Dispose all geometries and materials
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particlesMat.dispose();

      mainGroup.clear();
      scene.remove(mainGroup, particles, blueLight, redLight, ambientLight);
      scene.clear();

      // Force context loss to immediately release GPU resources
      renderer.forceContextLoss();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}

