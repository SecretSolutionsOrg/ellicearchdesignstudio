"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "outline" | "solid" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-light tracking-display uppercase " +
  "transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  outline:
    "border border-foreground/60 text-foreground hover:bg-foreground hover:text-background backdrop-blur-sm bg-foreground/0",
  solid: "bg-foreground text-background hover:bg-foreground/90",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-foreground/5",
  accent:
    "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_30px_-8px_rgba(212,168,75,0.6)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-7 text-sm",
  lg: "h-14 px-10 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
