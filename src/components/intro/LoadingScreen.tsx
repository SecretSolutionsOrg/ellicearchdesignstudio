"use client";

import { motion } from "framer-motion";

type Props = { progress: number };

export function LoadingScreen({ progress }: Props) {
  return (
    <motion.div
      key="loading"
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-background grain"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Faint backdrop sketch — uses one of the design placeholders */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
        style={{ backgroundImage: "url(/designs/placeholder-1.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.h1
        className="relative font-display text-[18vw] sm:text-[14vw] md:text-[10vw] font-light tracking-tight text-foreground/90"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        LOADING
      </motion.h1>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(360px,70vw)]">
        <div className="h-px bg-foreground/20 overflow-hidden">
          <motion.div
            className="h-full bg-accent origin-left"
            style={{ scaleX: Math.min(1, Math.max(0, progress)) }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <div className="mt-3 text-center text-[10px] tracking-display uppercase text-muted-foreground">
          {Math.round(Math.min(1, Math.max(0, progress)) * 100)}%
        </div>
      </div>
    </motion.div>
  );
}
