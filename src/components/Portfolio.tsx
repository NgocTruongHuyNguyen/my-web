"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Project } from "../types";
import ScrollHint from "./ScrollHint";

const projects: Project[] = [
  { id: 1, name: "Project One" },
  { id: 2, name: "Project Two" },
  { id: 3, name: "Project Three" },
  { id: 4, name: "Project Four" },
  { id: 5, name: "Project Five" },
  { id: 6, name: "Project Six" },
  { id: 7, name: "Project Seven" },
  { id: 8, name: "Project Eight" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex flex-col items-center gap-3 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-[3/4] bg-[#eeebe6] overflow-hidden relative">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#bbb] text-[0.62rem] tracking-widest">
            IMAGE
          </div>
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors duration-300" />
      </div>
      {/* Name */}
      <span className="text-[0.88rem] font-normal" style={{ color: "var(--text)" }}>
        {project.name}
      </span>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-30"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-[clamp(1.7rem,2.8vw,2.3rem)] font-medium tracking-wide text-center mb-14"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Portfolio
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 max-w-3xl w-full">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <ScrollHint href="#contact" label="Scroll to contact me" />
    </section>
  );
}
