import Image from "next/image";
import { studio } from "@/data/studio";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/branding/logo.jpg" alt={studio.name} width={44} height={44} />
            <div>
              <p className="font-display text-base tracking-display uppercase">{studio.name}</p>
              <p className="text-xs text-muted-foreground">{studio.tagline}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-display uppercase text-muted-foreground">Contact</p>
          <p className="mt-2 text-sm">{studio.contact.email}</p>
          <p className="text-sm">{studio.contact.phone}</p>
          <p className="mt-3 text-sm text-foreground/75 max-w-xs">{studio.location.address}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-display uppercase text-muted-foreground">Follow</p>
          <SocialLinks className="mt-3" />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {studio.name}. All rights reserved.</p>
          <p className="uppercase tracking-display">Crafted in the studio</p>
        </div>
      </div>
    </footer>
  );
}
