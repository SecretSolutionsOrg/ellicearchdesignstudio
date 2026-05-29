"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Input, Textarea, Label, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

const schema = z.object({
  name: z.string().min(2, "Please share your full name."),
  email: z.string().email("Please share a valid email address."),
  phone: z.string().optional(),
  service: z.string().min(1, "Please pick a service."),
  preferredDate: z.string().optional(),
  message: z.string().min(10, "A line or two helps us prepare.").max(2000),
});

type FormValues = z.infer<typeof schema>;

export function AppointmentSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: services[0]?.title ?? "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Could not send your request.");
      }
      setStatus("ok");
      reset({ service: services[0]?.title ?? "" });
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  return (
    <section id="appointments" className="relative bg-background py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-[10px] tracking-display uppercase text-accent">Appointments</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            Tell us about your project.
          </h2>
          <p className="mt-4 text-foreground/70 max-w-md">
            We respond to every enquiry personally, usually within two working days. Share a
            little about the project and we&apos;ll suggest the best next step — a studio visit,
            a site call, or a longer conversation.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input id="name" autoComplete="name" {...register("name")} />
            <FieldError>{errors.name?.message}</FieldError>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register("email")} />
              <FieldError>{errors.email?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                className="w-full bg-transparent border border-border focus:border-accent rounded-md px-4 py-3 text-sm text-foreground outline-none"
                {...register("service")}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title} className="bg-background">
                    {s.title}
                  </option>
                ))}
              </select>
              <FieldError>{errors.service?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="preferredDate">Preferred date</Label>
              <Input id="preferredDate" type="date" {...register("preferredDate")} />
            </div>
          </div>

          <div>
            <Label htmlFor="message">A few lines about your project</Label>
            <Textarea id="message" {...register("message")} />
            <FieldError>{errors.message?.message}</FieldError>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" variant="accent" size="md" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                "Request appointment"
              )}
            </Button>
            <AnimatePresence>
              {status === "ok" ? (
                <motion.p
                  key="ok"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-accent flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Thank you — we&apos;ll be in touch.
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {errorMsg}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}
