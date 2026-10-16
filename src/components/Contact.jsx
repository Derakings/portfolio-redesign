import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import {
  AlertIcon,
  CheckCircleIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  SendIcon,
} from "./icons";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqeyppab";

const socials = [
  { label: "LinkedIn", href: personalInfo.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: personalInfo.github, Icon: GitHubIcon },
];

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // honeypot: bots fill this hidden field

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t border-line bg-subtle py-24 sm:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="Get in touch"
          title={<>Let&apos;s build something <span className="text-gradient">great together</span></>}
          lead="Open to cloud engineering roles, freelance projects, and consulting. Send a message and I'll get back to you soon."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left: direct contact */}
          <Reveal>
            <div className="card h-full p-7">
              <h3 className="text-lg font-bold text-ink">Prefer email?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Reach out directly — I read every message.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-page p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MailIcon />
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="min-w-0 flex-1 truncate text-sm font-medium text-ink hover:text-accent"
                >
                  {personalInfo.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-line bg-card
                             text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {copied ? <CheckIcon className="h-4 w-4 text-emerald-500" /> : <CopyIcon className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 h-4 text-xs text-emerald-600 dark:text-emerald-400" aria-live="polite">
                {copied ? "Email copied to clipboard" : ""}
              </p>

              <div className="mt-6 space-y-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-line bg-page p-3 transition-colors hover:border-accent/50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-sm font-medium text-ink group-hover:text-accent">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="card space-y-5 p-7 sm:p-8">
              {/* Honeypot — hidden from people, visible to bots */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className="input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-ink">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  className="input resize-none"
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
                {status === "sending" ? (
                  "Sending…"
                ) : (
                  <>
                    Send message
                    <SendIcon className="h-4 w-4" />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    <CheckCircleIcon className="h-5 w-5 shrink-0" />
                    Message sent! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    role="alert"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300"
                  >
                    <AlertIcon className="h-5 w-5 shrink-0" />
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
