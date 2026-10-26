"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const COLORS = {
  abyss: "#05070d",
  icy: "#82b1ff",
  blood: "#ff4d4d",
  gold: "#ffca28",
  dim: "#3d4353",
  panelEdge: "rgba(130, 177, 255, 0.12)",
};

const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const displayFont = { fontFamily: "'Orbitron', sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Characters", href: "/characters" },
  { name: "Constellations", href: "/constellations" },
  { name: "Quotes", href: "/quotes" },
  { name: "Builder", href: "/builder" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const mobileNavRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const dismissMobileMenu = () => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      menuToggleRef.current?.focus();
    }, 50);
  };

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    // If navigating to the current path, restore focus to toggle
    if (pathname === href) {
      setTimeout(() => {
        menuToggleRef.current?.focus();
      }, 50);
    }
  };

  // Manage body scroll and background inertness for screen readers
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.setAttribute("aria-hidden", "true");
      mainEl.setAttribute("inert", "");
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (mainEl) {
        mainEl.removeAttribute("aria-hidden");
        mainEl.removeAttribute("inert");
      }
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  // Keyboard navigation & focus trap inside mobile modal dialog
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        dismissMobileMenu();
        return;
      }

      if (e.key === "Tab") {
        if (!mobileNavRef.current) return;
        const focusable = mobileNavRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus placed on the close button inside the dialog
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || mobileMenuOpen ? "py-3 backdrop-blur-md bg-black/80 shadow-lg" : "py-6 bg-transparent"
        }`}
        style={{
          borderBottom: (scrolled || mobileMenuOpen) ? `1px solid ${COLORS.panelEdge}` : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <div className="group flex items-center gap-2 cursor-pointer">
              <span style={{ color: COLORS.icy }} className="font-extrabold text-[15px] opacity-70 group-hover:opacity-100 transition-opacity">
                [
              </span>
              <span
                style={{ ...uiFont, color: "#eef2fb" }}
                className="font-bold text-[13px] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity"
              >
                Star Stream
              </span>
              <span style={{ color: COLORS.icy }} className="font-extrabold text-[15px] opacity-70 group-hover:opacity-100 transition-opacity">
                ]
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group rounded px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                >
                  <span
                    style={{ 
                      ...uiFont, 
                      color: isActive ? "#ffffff" : "#94a3b8",
                      textShadow: isActive ? `0 0 10px ${COLORS.icy}` : "none" 
                    }}
                    className={`text-[11px] uppercase tracking-widest font-bold transition-colors ${isActive ? "" : "group-hover:text-[#eef2fb]"}`}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px]"
                      style={{ background: COLORS.icy, boxShadow: `0 0 12px 2px ${COLORS.icy}` }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle (outside dialog) */}
          <button 
            ref={menuToggleRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="md:hidden text-white opacity-80 hover:opacity-100 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
            onClick={openMobileMenu}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Modal Dialog) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileNavRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] backdrop-blur-xl bg-black/95 md:hidden flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Dialog Top Bar with Title & Keyboard-Accessible Close Control */}
            <div className="flex items-center justify-between border-b border-[#82b1ff]/20 pb-4">
              <div className="flex items-center gap-2">
                <span style={{ color: COLORS.icy }} className="font-extrabold text-[15px] opacity-70">
                  [
                </span>
                <span
                  id="mobile-nav-title"
                  style={{ ...displayFont, color: "#eef2fb" }}
                  className="font-bold text-xs uppercase tracking-widest"
                >
                  Navigation Menu
                </span>
                <span style={{ color: COLORS.icy }} className="font-extrabold text-[15px] opacity-70">
                  ]
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={dismissMobileMenu}
                aria-label="Close navigation menu"
                className="text-[#82b1ff] hover:text-white p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center gap-6 my-auto">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="rounded px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                  >
                    <span
                      style={{ 
                        ...uiFont, 
                        color: isActive ? "#ffffff" : "#94a3b8",
                        textShadow: isActive ? `0 0 15px ${COLORS.icy}` : "none"
                      }}
                      className="text-2xl uppercase tracking-widest font-black transition-colors hover:text-[#eef2fb]"
                    >
                      {isActive ? `[ ${link.name} ]` : link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Dialog Footer Status */}
            <div className="text-center pt-4 border-t border-white/10">
              <p style={{ ...monoFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-widest">
                [ Star Stream Navigation // Scenario Active ]
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
