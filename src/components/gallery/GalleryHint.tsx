"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = { storageKey: string; title: string; subtitle: string };

export function GalleryHint({ storageKey, title, subtitle }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(storageKey) !== "dismissed") {
        const t = setTimeout(() => setOpen(true), 400);
        return () => clearTimeout(t);
      }
    } catch {}
  }, [storageKey]);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(storageKey, "dismissed");
    } catch {}
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/55 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pointer-events-auto text-center px-6">
            <p className="text-accent font-display tracking-display uppercase text-2xl">{title}</p>
            <p className="mt-2 text-xs tracking-display uppercase text-muted-foreground">
              {subtitle}
            </p>
            <div className="mt-6">
              <Button variant="outline" size="md" onClick={dismiss}>
                Got it
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
