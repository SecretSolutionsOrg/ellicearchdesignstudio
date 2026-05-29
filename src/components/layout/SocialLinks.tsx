"use client";

import { studio } from "@/data/studio";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H7.7V14h2.7v8h3.1z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3zM10 9.5h3.8v1.55h.05c.53-.95 1.83-1.95 3.77-1.95C21.6 9.1 22 11.5 22 14.6V20.5h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7v5.19h-4z" />
    </svg>
  );
}

function BehanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.2 7H2.5v10h6c2 0 3.6-1.2 3.6-3.1 0-1.3-.7-2.2-1.9-2.6.9-.4 1.5-1.2 1.5-2.3C11.7 8 10.3 7 8.2 7zM5 8.7h2.7c.9 0 1.4.4 1.4 1.1s-.5 1.1-1.4 1.1H5V8.7zm0 6.6v-2.4h3c1 0 1.6.5 1.6 1.2s-.6 1.2-1.6 1.2H5zM20 13.7c0-2.2-1.4-3.8-3.8-3.8s-3.9 1.6-3.9 3.8 1.5 3.8 4 3.8c1.8 0 3.1-.7 3.6-2h-2.1c-.2.4-.7.6-1.4.6-1 0-1.6-.5-1.7-1.5H20v-.9zm-5.4-.8c.2-.9.8-1.4 1.7-1.4s1.5.5 1.7 1.4h-3.4zM14.4 8.6h4.4V7.5h-4.4v1.1z" />
    </svg>
  );
}

const items = [
  { href: studio.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: studio.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: studio.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: studio.social.behance, label: "Behance", Icon: BehanceIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ""}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground/75 hover:text-accent hover:border-accent transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
