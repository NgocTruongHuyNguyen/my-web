"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollHint from "./ScrollHint";

interface Project {
  id: number;
  name: string;
  description: string;
  image?: string;
  link?: string;
  stats?: string;       
  tags?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Project One",
    description:
      "A short description of what this project does, the problem it solves, and what makes it interesting or unique.",
    link: "https://github.com/yourusername",
    stats: "★ 42",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    name: "Project Two",
    description:
      "Another project description. Talk about the tech you used, the impact it had, or any notable achievements.",
    link: "https://github.com/yourusername",
    stats: "↓ 10k+ Downloads",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 3,
    name: "Project Three",
    description:
      "Describe this project in a couple of sentences. Keep it concise but informative enough to spark curiosity.",
    link: "https://github.com/yourusername",
    tags: ["Python", "FastAPI", "Docker"],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="flex gap-6 sm:gap-8 group"
    >
      {/* Thumbnail */}
      <a
        href={project.link ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 w-[120px] sm:w-[160px] aspect-[4/3] overflow-hidden relative block"
        style={{ background: "var(--thumb-bg)" }}
        tabIndex={-1}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-[0.6rem] tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            IMAGE
          </div>
        )}
      </a>

      {/* Info */}
      <div className="flex flex-col justify-center gap-2 min-w-0">
        {/* Title + arrow */}
        <a
          href={project.link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 no-underline group/link"
        >
          <span
            className="text-[1.1rem] sm:text-[1.25rem] font-medium tracking-wide transition-opacity duration-200 group-hover/link:opacity-70"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text)" }}
          >
            {project.name}
          </span>
          {project.link && (
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              className="shrink-0 opacity-50 group-hover/link:opacity-100 transition-opacity"
            >
              <path
                d="M1 12L12 1M12 1H4M12 1V9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--text)" }}
              />
            </svg>
          )}
        </a>

        {/* Description */}
        <p
          className="text-[0.82rem] leading-loose line-clamp-3"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        {/* Stats */}
        {project.stats && (
          <p className="text-[0.82rem]" style={{ color: "var(--muted)" }}>
            {project.stats}
          </p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.72rem] px-3 py-1 rounded-full"
                style={{
                  background: "var(--green)",
                  color: "#fff",
                  opacity: 0.85,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-20"
    >
      <div className="w-full max-w-2xl">
        <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="text-[clamp(1.7rem,2.8vw,2.3rem)] font-medium tracking-wide text-center mb-14"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Projects
      </motion.h2>

        <div className="flex flex-col gap-12 w-full pb-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <ScrollHint href="#contact" label="Scroll to contact me" />
    </section>
  );
}
