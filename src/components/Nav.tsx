"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-16 py-6 backdrop-blur-md"
  style={{ background: "var(--nav-bg)" }}>
      {links.map(({ label, href }) => {
        const id = href.replace("#", "");
        return (
          <a
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className={`text-[0.95rem] font-normal transition-opacity duration-200 ${
              active === id ? "opacity-100" : "opacity-60 hover:opacity-90"
            }`}
            style={{ color: "var(--text)", textDecoration: "none" }}
          >
            {label}
          </a>
        );
      })}
      <div className="absolute right-8">
        <ThemeToggle />
      </div>
    </nav>
  );
}
