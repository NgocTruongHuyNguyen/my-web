"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
      style={{
        borderColor: "var(--muted)",
        color: "var(--text)",
        background: "transparent",
      }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0l1.41 1.42a1 1 0 1 1-1.41 1.41L4.22 5.64a1 1 0 0 1 0-1.42zm12.72 12.72a1 1 0 0 1 1.41 0l1.42 1.41a1 1 0 1 1-1.41 1.42l-1.42-1.42a1 1 0 0 1 0-1.41zM3 12a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zM4.22 19.78a1 1 0 0 1 0-1.41l1.41-1.42a1 1 0 1 1 1.42 1.42L5.64 19.78a1 1 0 0 1-1.42 0zm12.72-12.72a1 1 0 0 1 0-1.42l1.42-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.42a1 1 0 0 1-1.42 0z"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        </svg>
      )}
    </button>
  );
}