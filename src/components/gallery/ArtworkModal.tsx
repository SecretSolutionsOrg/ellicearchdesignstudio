"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import type { Design } from "@/data/designs";
import { Button } from "@/components/ui/Button";

type Props = {
  design: Design | null;
  onClose: () => void;
};

export function ArtworkModal({ design, onClose }: Props) {
  return (
    <Modal open={!!design} onClose={onClose}>
      {design ? (
        <div className="grid md:grid-cols-2">
          <div className="relative bg-muted aspect-[4/5] md:aspect-auto md:min-h-[480px]">
            <Image
              src={design.image}
              alt={design.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-[10px] tracking-display uppercase text-muted-foreground">
              {design.category} · {design.year}
            </p>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl">{design.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{design.location}</p>

            <p className="mt-6 text-sm leading-relaxed text-foreground/85">
              {design.description}
            </p>

            <ul className="mt-6 space-y-2">
              {design.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-2 h-1 w-3 bg-accent shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="accent" size="md" onClick={() => (window.location.hash = "#appointments")}>
                Enquire about this design
              </Button>
              <Button variant="outline" size="md" onClick={onClose}>
                Back to gallery
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
