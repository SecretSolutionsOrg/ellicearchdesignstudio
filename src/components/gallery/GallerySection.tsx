"use client";

import dynamic from "next/dynamic";

// Three.js / R3F is client-only and heavy — load it just for the gallery section.
const Gallery3D = dynamic(
  () => import("./Gallery3D").then((m) => m.Gallery3D),
  { ssr: false, loading: () => null },
);

export function GallerySection() {
  return (
    <section id="gallery" className="relative w-full h-screen min-h-[640px]">
      <Gallery3D />
    </section>
  );
}
