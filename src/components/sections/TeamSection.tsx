"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "@/data/team";

export function TeamSection() {
  return (
    <section id="team" className="relative bg-muted/30 py-24 sm:py-32 border-y border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-display uppercase text-accent">Meet the Studio</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            A small team. A long conversation.
          </h2>
          <p className="mt-4 text-foreground/70 max-w-xl">
            We keep the studio intentionally small so the people designing your project are the
            same people drawing it, walking the site, and seeing it built.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-background">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-xl">{m.name}</h3>
              <p className="text-[10px] tracking-display uppercase text-accent mt-1">{m.role}</p>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{m.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
