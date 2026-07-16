"use client";

import React, { useState, useEffect } from "react";
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

const uiFont = { fontFamily: "Inter, sans-serif" };

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || mobileMenuOpen ? "py-3 backdrop-blur-md bg-black/80 shadow-lg" : "py-6 bg-transparent"
        }`}
        style={{
          borderBottom: (scrolled || mobileMenuOpen) ? `1px solid ${COLORS.panelEdge}` : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
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
                <Link key={link.name} href={link.href} className="relative group">
                  <span
                    style={{ 
                      ...uiFont, 
                      color: isActive ? "#ffffff" : "#8a93a8",
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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white opacity-80 hover:opacity-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 pt-24 px-6 pb-6 backdrop-blur-xl bg-black/95 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span
                    style={{ 
                      ...uiFont, 
                      color: isActive ? "#ffffff" : "#8a93a8",
                      textShadow: isActive ? `0 0 15px ${COLORS.icy}` : "none"
                    }}
                    className="text-2xl uppercase tracking-widest font-black transition-colors hover:text-[#eef2fb]"
                  >
                    {isActive ? `[ ${link.name} ]` : link.name}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
