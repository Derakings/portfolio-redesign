import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "../data/portfolioData";
import { scrollToSection } from "../utils/scroll";
import TechMarquee from "./TechMarquee";
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Types out each word, pauses, deletes it, then moves to the next.
function Typewriter({ words }) {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState({ index: 0, text: "", deleting: false });

  useEffect(() => {
    if (reduceMotion) return undefined;

    const { index, text, deleting } = state;
    const word = words[index];
    let delay = deleting ? 35 : 75;
    let next;

    if (!deleting && text === word) {
      delay = 1700;
      next = { index, text, deleting: true };
    } else if (deleting && text === "") {
      delay = 250;
      next = { index: (index + 1) % words.length, text: "", deleting: false };
    } else {
      const length = text.length + (deleting ? -1 : 1);
      next = { index, text: word.slice(0, length), deleting };
    }

    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [state, words, reduceMotion]);

  const shown = reduceMotion ? words[0] : state.text;

  return (
    <span className="text-gradient">
      {shown}
      <span className="ml-0.5 inline-block w-[3px] animate-blink rounded-full bg-accent align-middle">
        &nbsp;
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40">
      {/* Background: dots + soft animated colour blobs */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-dots absolute inset-0" />
        <div className="absolute -left-24 top-8 h-80 w-80 animate-blob rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/15" />
        <div
          className="absolute right-0 top-24 h-96 w-96 animate-blob rounded-full bg-yellow-200/35 blur-3xl dark:bg-yellow-400/10"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 animate-blob rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-500/10"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <div className="section-container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Text */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="eyebrow !normal-case !tracking-normal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="text-gradient">{personalInfo.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 min-h-[2.25rem] text-xl font-semibold text-ink sm:text-3xl"
          >
            <span className="text-muted">I&apos;m a </span>
            <Typewriter words={personalInfo.roles} />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToSection("projects")} className="btn-primary">
              View my work
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <DownloadIcon className="h-4 w-4" />
              Download resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {[
              { label: "GitHub", href: personalInfo.github, Icon: GitHubIcon },
              { label: "LinkedIn", href: personalInfo.linkedin, Icon: LinkedInIcon },
              { label: "Email", href: `mailto:${personalInfo.email}`, Icon: MailIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-muted
                           shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[25rem] lg:ml-auto lg:mr-4 lg:max-w-[27rem]"
        >
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.photoAlt}
            width="480"
            height="600"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-center [mask-image:radial-gradient(ellipse_78%_82%_at_50%_46%,#000_68%,transparent_100%)]"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
}
