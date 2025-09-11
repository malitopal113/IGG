"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";

// IGG Contact – modern (glass + ambient), Tailwind + Framer Motion
// - Accent: #dca14a
// - Fully responsive
// - No `any`, accessible
// - Map: replace iframe src if you want a different city

const ACCENT = "#dca14a";

// ---- Dynamic form fields ----
const FIELDS = [
  { id: "name", label: "Full name", type: "text", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
  { id: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

type BaseForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

// Index signature lets us do values[f.id] safely (no any)
type FormData = BaseForm & Record<string, string>;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function validate(values: FormData) {
  const errs: Record<string, string> = {};
  if (!values.name?.trim()) errs.name = "Please enter your name.";
  if (!values.email?.trim()) errs.email = "Please enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Please enter a valid email address.";
  if (!values.subject?.trim()) errs.subject = "Please enter a subject.";
  if (!values.message?.trim() || values.message.trim().length < 10) {
    errs.message = "Message should be at least 10 characters.";
  }
  if (values.phone && !/^[+\d().\-\s]{6,}$/.test(values.phone)) {
    errs.phone = "Please enter a valid phone number.";
  }
  return errs;
}

export default function ContactPage() {
  const [values, setValues] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setStatus("loading");
      setStatusMsg("");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setStatusMsg("Thank you! Your message has been sent.");
        setValues({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("error");
        setStatusMsg(j.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-50 pt-20">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: ACCENT, opacity: 0.25 }} />
        <div className="absolute right-[-6rem] top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: "#fff", opacity: 0.06 }} />
        <div className="absolute -bottom-36 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl" style={{ background: ACCENT, opacity: 0.18 }} />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start gap-4">
          <motion.span variants={item} className="inline-flex items-center rounded-full border border-[#dca14a]/40 bg-[#1a1306] px-3 py-1 text-xs font-semibold text-[#e9c88a]">
            Contact
          </motion.span>
          <motion.h1 variants={item} className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Let’s build something great together.
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-neutral-300">
            Questions, quote or partnership — send the form and we’ll get back shortly.
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* auto-rows + 3 columns on lg; map will span 2 rows to kill the empty space */}
        <div className="grid grid-cols-1 gap-8 lg:auto-rows-min lg:grid-cols-3">
          {/* FORM */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="lg:col-span-2">
            <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <motion.div variants={item} key={f.id}>
                      <label htmlFor={f.id} className="mb-2 block text-sm/6 text-neutral-200">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm/6 text-neutral-50 outline-none ring-0 transition placeholder:text-neutral-400 hover:border-white/20 focus:border-[#dca14a] focus:ring-2 focus:ring-[#dca14a]/30"
                        value={values[f.id] || ""}
                        onChange={handleChange}
                        aria-invalid={!!errors[f.id]}
                        aria-describedby={errors[f.id] ? `${f.id}-err` : undefined}
                      />
                      {errors[f.id] && (
                        <p id={`${f.id}-err`} className="mt-1 text-sm text-red-400">
                          {errors[f.id]}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={item}>
                  <label htmlFor="message" className="mb-2 block text-sm/6 text-neutral-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm/6 text-neutral-50 outline-none ring-0 transition placeholder:text-neutral-400 hover:border-white/20 focus:border-[#dca14a] focus:ring-2 focus:ring-[#dca14a]/30"
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-err" : undefined}
                  />
                  {errors.message && (
                    <p id="message-err" className="mt-1 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-4">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#dca14a] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-amber-500/20 transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dca14a]/40 cursor-pointer"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </motion.button>
                  {status !== "idle" && (
                    <p
                      className={`text-sm ${
                        status === "success" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-neutral-300"
                      }`}
                      role={status === "error" ? "alert" : undefined}
                    >
                      {statusMsg}
                    </p>
                  )}
                </motion.div>
              </form>
            </motion.div>

            {/* Info tiles under form (keeps left column tall) */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              {[
                { title: "Phone", content: "+32 472 32 00 51", href: "tel:+32472320051" },
                { title: "Email", content: "info@infogroupglobal.com", href: "mailto:info@infogroupglobal.com" },
                { title: "Business Hours", content: "Monday to Friday  – 9 AM to 5 PM" },
                { title: "Address", content: "Excelsiorlaan 1, 1930 Zaventem / BELGIUM" },
              ].map((c, i) => (
                <motion.a
                  key={i}
                  href={("href" in c && c.href) || undefined}
                  variants={item}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <p className="text-xs uppercase tracking-wide text-neutral-400">{c.title}</p>
                  <p className="mt-1 text-sm text-neutral-100">{c.content}</p>
                  <div className="mt-2 h-px w-0 bg-[#dca14a] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* MAP PANEL — spans two rows, fills height */}
          <motion.aside
            variants={item}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md
                       lg:row-span-2 self-stretch flex flex-col"
          >
            <div className="border-b border-white/10 p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-[#e9c88a] text-center">Map</h3>
              <p className="mt-1 text-xs text-neutral-300/80"></p>
            </div>
            <div className="w-full flex-1 min-h-[300px]">
              <iframe
                title="IGG Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5034.601375288372!2d4.453662076936203!3d50.881144956259206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dcfc72accba1%3A0x2e3eebe65d002270!2sExcelsiorlaan%201%2C%201930%20Zaventem!5e0!3m2!1snl!2sbe!4v1757555715136!5m2!1snl!2sbe" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
