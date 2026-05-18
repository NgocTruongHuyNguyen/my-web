"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import SnakeGame from "./SnakeGame";

// SVG Icons
const DownloadIcon = () => (
  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
    <path d="M12 16L7 11H10V4H14V11H17L12 16ZM5 18H19V20H5V18Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26C14.5 19.6 14.5 20.68 14.5 21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
  </svg>
);

const GameIcon = () => (
  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
    <path d="M7.5 5C6.12 5 5 6.12 5 7.5V9H3V11H5V13H3V15H5V16.5C5 17.88 6.12 19 7.5 19H9V21H11V19H13V21H15V19H16.5C17.88 19 19 17.88 19 16.5V15H21V13H19V11H21V9H19V7.5C19 6.12 17.88 5 16.5 5H15V3H13V5H11V3H9V5H7.5M7.5 7H16.5C16.78 7 17 7.22 17 7.5V16.5C17 16.78 16.78 17 16.5 17H7.5C7.22 17 7 16.78 7 16.5V7.5C7 7.22 7.22 7 7.5 7M10 9V11H9V13H11V9H10M13 11V13H15V11H14V9H12V11H13Z" />
  </svg>
);

interface ContactCardProps {
  bg: string;
  label: string;
  sub?: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

function ContactCard({ bg, label, sub, icon, href, onClick }: ContactCardProps) {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="flex items-center justify-between px-6 py-[1.1rem] rounded-sm w-full text-left cursor-pointer transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 no-underline border-none"
      style={{ background: bg }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.92rem] font-normal text-[var(--text)]">{label}</span>
        {sub && (
          <span className="text-[0.92rem] font-normal text-white/88">{sub}</span>
        )}
      </div>
      {icon}
    </Tag>
  );
}

export default function ContactSection() {
  const [snakeOpen, setSnakeOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-[clamp(1.7rem,2.8vw,2.3rem)] font-medium tracking-wide text-center mb-14"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Contact
      </motion.h2>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="flex flex-col gap-4 w-full max-w-[480px]"
      >
        <ContactCard
          bg="var(--green)"
          label="Download CV"
          icon={<DownloadIcon />}
          href="/cv.pdf"
        />
        <ContactCard
          bg="var(--grey-card)"
          label="Check my professional profile at"
          sub="LinkedIn"
          icon={<LinkedInIcon />}
          href="https://linkedin.com/in/yourprofile"
        />
        <ContactCard
          bg="var(--grey-card)"
          label="See more of my work at"
          sub="Github"
          icon={<GitHubIcon />}
          href="https://github.com/yourusername"
        />
        <ContactCard
          bg="var(--grey-card)"
          label="Relax"
          sub="Snake Game"
          icon={<GameIcon />}
          onClick={() => setSnakeOpen(true)}
        />
      </motion.div>

      {/* {snakeOpen && <SnakeGame onClose={() => setSnakeOpen(false)} />} */}
    </section>
  );
}
