"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { studio } from "@/data/studio";

type Props = { onContinue: () => void };

export function QuoteScreen({ onContinue }: Props) {
  return (
    <motion.section
      key="quote"
      className="fixed inset-0 z-30 flex items-center justify-center grain overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-50"
        style={{ backgroundImage: "url(/designs/placeholder-1.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative max-w-4xl px-6 text-center">
        <motion.p
          className="font-display text-2xl sm:text-3xl md:text-4xl leading-relaxed text-foreground/95 tracking-wide"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          {studio.quote.text}
        </motion.p>

        <motion.p
          className="mt-8 font-script text-3xl sm:text-4xl text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          {studio.quote.attribution}
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Button variant="outline" size="lg" onClick={onContinue}>
            Explore
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
