"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./intro/LoadingScreen";
import { QuoteScreen } from "./intro/QuoteScreen";
import { HeroScreen } from "./intro/HeroScreen";
import { Nav } from "./layout/Nav";
import { Footer } from "./layout/Footer";
import { GallerySection } from "./gallery/GallerySection";
import { ServicesSection } from "./sections/ServicesSection";
import { TeamSection } from "./sections/TeamSection";
import { AboutSection } from "./sections/AboutSection";
import { LocationSection } from "./sections/LocationSection";
import { AppointmentSection } from "./sections/AppointmentSection";

type Stage = "loading" | "quote" | "hero" | "site";

export function SiteShell() {
  const [stage, setStage] = useState<Stage>("loading");
  const [progress, setProgress] = useState(0);

  // Faux load: 0 → 1 over ~1.8s, then auto-advance to the quote screen.
  useEffect(() => {
    if (stage !== "loading") return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setStage("quote"), 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  // After the user enters, scroll-to-top so the gallery becomes the first thing they see.
  useEffect(() => {
    if (stage === "site") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [stage]);

  return (
    <>
      <Nav visible={stage === "site"} />

      <AnimatePresence mode="wait">
        {stage === "loading" ? <LoadingScreen key="loading" progress={progress} /> : null}
        {stage === "quote" ? (
          <QuoteScreen key="quote" onContinue={() => setStage("hero")} />
        ) : null}
        {stage === "hero" ? (
          <HeroScreen key="hero" onEnter={() => setStage("site")} />
        ) : null}
      </AnimatePresence>

      {stage === "site" ? (
        <main id="top" className="flex-1">
          <GallerySection />
          <AboutSection />
          <ServicesSection />
          <TeamSection />
          <LocationSection />
          <AppointmentSection />
          <Footer />
        </main>
      ) : null}
    </>
  );
}
