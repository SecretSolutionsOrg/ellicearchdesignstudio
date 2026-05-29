"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import { studio } from "@/data/studio";

export function LocationSection() {
  return (
    <section id="location" className="relative bg-muted/30 py-24 sm:py-32 border-y border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[10px] tracking-display uppercase text-accent">Visit the Studio</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            Come walk a model with us.
          </h2>
          <p className="mt-4 text-foreground/70 max-w-xl">
            Our studio is open by appointment. Drop in to see physical models, finish samples, and
            the working drawings behind the renders.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <a
                href={studio.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-foreground/90 hover:text-accent transition-colors"
              >
                {studio.location.address}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <a
                href={`mailto:${studio.contact.email}`}
                className="text-sm text-foreground/90 hover:text-accent transition-colors"
              >
                {studio.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <a
                href={`tel:${studio.contact.phone.replace(/\s+/g, "")}`}
                className="text-sm text-foreground/90 hover:text-accent transition-colors"
              >
                {studio.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-border bg-background">
          {/* Placeholder embedded map. Replace `src` with a real Google Maps embed URL when ready. */}
          <iframe
            title="Studio location map"
            aria-label="Studio location map"
            src="https://www.google.com/maps?q=Manila&output=embed"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
