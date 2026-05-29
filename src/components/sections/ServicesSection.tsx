"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-background py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-display uppercase text-accent">Services</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            What we build, beyond the drawing.
          </h2>
          <p className="mt-4 text-foreground/70 max-w-xl">
            From the first conversation about a site to the moment a building is occupied,
            we work across scales and disciplines to shape places that earn their lifespan.
          </p>
        </div>

        <ul className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              className="bg-background p-8 group hover:bg-muted/40 transition-colors"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <p className="text-[10px] tracking-display uppercase text-muted-foreground">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-display text-2xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/75">{s.blurb}</p>
              <ul className="mt-4 space-y-1.5">
                {s.details.map((d) => (
                  <li key={d} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="mt-2 h-px w-3 bg-accent shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
