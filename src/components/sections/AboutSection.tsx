"use client";

import { motion } from "framer-motion";
import { studio } from "@/data/studio";

const numbers = [
  { value: "12+", label: "Years of practice" },
  { value: "80+", label: "Projects realised" },
  { value: "06", label: "Countries served" },
  { value: "04", label: "Recognitions" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <p className="text-[10px] tracking-display uppercase text-accent">About</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            Architecture as a quiet kind of attention.
          </h2>
          <div className="mt-6 space-y-5 text-foreground/80 max-w-2xl">
            <p>
              {studio.name} is a small studio that designs houses, workplaces, and the occasional
              civic project. We work slowly, draw a lot, and visit the site often. We believe in
              buildings that age well, that hold light gently, and that make a place feel like
              itself.
            </p>
            <p>
              Each project begins with a long conversation — about how you live or work, what the
              land already wants to do, and what kind of building should belong here. The gallery
              you just walked through is the answer, the way we know it best: room by room.
            </p>
          </div>
        </div>

        <dl className="lg:col-span-2 grid grid-cols-2 gap-px bg-border border border-border self-start">
          {numbers.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-background p-6"
            >
              <dt className="text-[10px] tracking-display uppercase text-muted-foreground">
                {n.label}
              </dt>
              <dd className="mt-2 font-display text-4xl">{n.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
