"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import ScrollHint from "./ScrollHint";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 pb-16"
    >
      <div className="flex flex-col items-center text-center gap-0">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-36 h-36 mb-8 overflow-hidden  flex items-center justify-center"
        >
        <Image src="/MyPhoto.JPG" alt="Ngoc Truong Huy Nguyen" loading="eager" width={144} height={144} className="object-cover w-full h-full rounded-full" />        
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium tracking-wide mb-1"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif'" }}
        >
          Ngoc Truong Huy Nguyen
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[clamp(1.1rem,2.2vw,1.55rem)] font-light mb-7"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--muted)",
          }}
        >
          I&apos;m a Software Developer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-[0.83rem] leading-relaxed max-w-sm"
          style={{ color: "var(--muted)" }}
        >
          Passionate about building clean, performant, and user-friendly
          applications. I love turning complex ideas into elegant digital
          experiences.
        </motion.p>
      </div>

      <ScrollHint href="#about" label="Scroll to know more about me" />
    </section>
  );
}
