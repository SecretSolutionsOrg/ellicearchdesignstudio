"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { GalleryRoom } from "./GalleryRoom";
import { GalleryHint } from "./GalleryHint";
import { ArtworkModal } from "./ArtworkModal";
import { designs } from "@/data/designs";
import { Button } from "@/components/ui/Button";

export function Gallery3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeDesign = useMemo(() => designs[activeIndex], [activeIndex]);
  const selectedDesign = useMemo(
    () => (selectedId ? designs.find((d) => d.id === selectedId) ?? null : null),
    [selectedId],
  );

  const advance = (delta: number) =>
    setActiveIndex((i) => (i + delta + designs.length) % designs.length);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <Canvas
        camera={{ fov: 65, near: 0.1, far: 200, position: [0, 0, 0.01] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#070504"]} />
        <fog attach="fog" args={["#070504", 12, 28]} />
        <Suspense fallback={null}>
          <GalleryRoom activeIndex={activeIndex} onSelect={setSelectedId} />
        </Suspense>
      </Canvas>

      {/* Vignette + grain overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 220px 80px rgba(0,0,0,0.85)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grain" />

      {/* Active artwork label (bottom) */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 text-center px-4">
        <p className="text-[10px] tracking-display uppercase text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")} / {String(designs.length).padStart(2, "0")} ·{" "}
          {activeDesign.category}
        </p>
        <h2 className="mt-1 font-display text-3xl sm:text-4xl text-foreground/95">
          {activeDesign.title}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {activeDesign.location} · {activeDesign.year}
        </p>
      </div>

      {/* Arrow controls */}
      <button
        type="button"
        aria-label="Previous design"
        onClick={() => advance(-1)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full border border-accent/60 bg-black/40 backdrop-blur flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next design"
        onClick={() => advance(1)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 h-14 w-14 rounded-full border border-accent/60 bg-black/40 backdrop-blur flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* "View details" CTA for the active artwork */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Button
          variant="accent"
          size="md"
          onClick={() => setSelectedId(activeDesign.id)}
        >
          <Info className="h-4 w-4" />
          View design
        </Button>
      </div>

      <GalleryHint
        storageKey="eads-hint-explore"
        title="Explore"
        subtitle="Use the arrows to walk the gallery"
      />

      <ArtworkModal design={selectedDesign} onClose={() => setSelectedId(null)} />
    </div>
  );
}
