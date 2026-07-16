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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Meshes ──────────────────────────────────────────────────────
    const outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.85, 1),
      new THREE.MeshBasicMaterial({
        color: "#82b1ff",
        wireframe: true,
        transparent: true,
        opacity: 0.52,
      })
    );

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 0),
      new THREE.MeshBasicMaterial({
        color: "#ff4d4d",
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 24, 24),
      new THREE.MeshBasicMaterial({ color: "#82b1ff", transparent: true, opacity: 0.65 })
    );

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.78, 16, 16),
      new THREE.MeshBasicMaterial({
        color: "#82b1ff",
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
      })
    );

    // Main group receives the mouse-tilt rotation
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
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: "#82b1ff",
        size: 0.04,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.72,
      })
    );
    scene.add(particles);

    // ── Lights ──────────────────────────────────────────────────────
    const blueLight = new THREE.PointLight("#82b1ff", 2.4, 12);
    const redLight  = new THREE.PointLight("#ff4d4d", 0.7,  7);
    redLight.position.set(2.5, -2, 1.5);
    scene.add(blueLight, redLight, new THREE.AmbientLight("#ffffff", 0.1));

    // ── Mouse tracking ──────────────────────────────────────────────
    let mx = 0, my = 0;
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ──────────────────────────────────────────────
    let t = 0, raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t  += 0.016;

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

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──────────────────────────────────────────────────────
    const onResize = () => {
      const nw = container.offsetWidth;
      const nh = container.offsetHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ─────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      particleGeo.dispose();
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
