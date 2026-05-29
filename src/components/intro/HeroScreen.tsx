"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { studio } from "@/data/studio";

type Props = { onEnter: () => void };

export function HeroScreen({ onEnter }: Props) {
  return (
    <motion.section
      key="hero"
      className="fixed inset-0 z-20 grain overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/designs/placeholder-2.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />

      <div className="relative h-full flex items-center px-6 sm:px-12 md:px-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 flex items-center gap-4"
          >
            <Image
              src="/branding/logo.jpg"
              alt={studio.name}
              width={64}
              height={64}
              priority
            />
            <div>
              <p className="text-[10px] tracking-display uppercase text-muted-foreground">
                Portfolio · {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-8xl font-light leading-[1.05] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            My Art
            <br />
            <span className="italic font-medium">Gallery</span>
          </motion.h1>

          <motion.p
            className="mt-4 font-script text-3xl sm:text-4xl text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            Ellice
          </motion.p>

          <motion.p
            className="mt-6 max-w-md text-sm sm:text-base text-foreground/70 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            {studio.tagline} Step inside the studio&apos;s gallery and walk through
            each design like a curated room.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Button variant="accent" size="lg" onClick={onEnter}>
              Enter the Gallery
            </Button>
            <a
              href="#about"
              className="text-xs uppercase tracking-display text-foreground/70 hover:text-foreground transition"
            >
              About the studio →
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
