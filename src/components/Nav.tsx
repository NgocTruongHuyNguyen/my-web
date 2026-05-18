"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Track active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center px-6 md:px-0 py-5 backdrop-blur-md"
        style={{ background: "var(--nav-bg)" }}
      >
        {/* Desktop links — centered */}
        <div className="hidden md:flex gap-16 items-center">
          {links.map(({ label, href }) => {
            const id = href.replace("#", "");
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleClick(href); }}
                className="text-[0.95rem] font-normal transition-opacity duration-200"
                style={{
                  color: "var(--text)",
                  textDecoration: "none",
                  opacity: active === id ? 1 : 0.6,
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Desktop theme toggle */}
        <div className="hidden md:block absolute right-8">
          <ThemeToggle />
        </div>

        {/* Mobile: logo left + right side controls */}
        <span
          className="md:hidden text-[1rem] font-medium tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text)" }}
        >

        </span>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[1.5px] origin-center"
              style={{ background: "var(--text)" }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px]"
              style={{ background: "var(--text)" }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[1.5px] origin-center"
              style={{ background: "var(--text)" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
            style={{ background: "var(--bg)" }}
          >
            {links.map(({ label, href }, i) => {
              const id = href.replace("#", "");
              return (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={(e) => { e.preventDefault(); handleClick(href); }}
                  className="text-[2rem] font-medium tracking-wide no-underline transition-opacity duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--text)",
                    opacity: active === id ? 1 : 0.5,
                  }}
                >
                  {label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
