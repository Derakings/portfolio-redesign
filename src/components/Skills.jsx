import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certifications, skills } from "../data/portfolioData";
import { trackPointer } from "../utils/pointer";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { AwardIcon, ExternalIcon, NamedIcon, SearchIcon } from "./icons";

const categoryIcons = {
  "Cloud Platforms": "cloud",
  "Infrastructure as Code": "code",
  "Containers & Orchestration": "cube",
  "CI/CD & DevOps": "loop",
  "Monitoring & Logging": "chart",
  "Programming & Scripting": "terminal",
  "Version Control & Collaboration": "branch",
  "Security & Identity": "shield",
  "Linux & Networking": "server",
  "Web development": "globe",
  "Soft Skills": "users",
};

const tabs = [
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
];

function SkillsGrid({ query }) {
  const q = query.trim().toLowerCase();

  // Keep a category if its name matches (show everything) or if any item matches (show those items).
  const visible = skills
    .map((skill) => {
      if (!q || skill.category.toLowerCase().includes(q)) return skill;
      return { ...skill, items: skill.items.filter((it) => it.toLowerCase().includes(q)) };
    })
    .filter((skill) => skill.items.length > 0);

  if (visible.length === 0) {
    return (
      <p className="py-16 text-center text-muted">
        No skills match &ldquo;{query}&rdquo;. Try &ldquo;AWS&rdquo; or &ldquo;Docker&rdquo;.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((skill, i) => (
        <motion.div
          key={skill.category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.4 }}
          onMouseMove={trackPointer}
          className="card spotlight p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-amber-600/10"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <NamedIcon name={categoryIcons[skill.category]} className="h-5 w-5" />
            </span>
            <h3 className="text-sm font-bold text-ink">{skill.category}</h3>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

function CertificationsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {certifications.map((cert, i) => {
        const hasLink = Boolean(cert.credentialUrl) && cert.credentialUrl !== "#";
        const Wrapper = hasLink ? motion.a : motion.div;
        const linkProps = hasLink
          ? { href: cert.credentialUrl, target: "_blank", rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={cert.name}
            {...linkProps}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onMouseMove={trackPointer}
            className="card spotlight group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-amber-600/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/25">
              <AwardIcon />
            </span>
            <h3 className="mt-5 text-base font-bold leading-snug text-ink">{cert.name}</h3>
            <p className="mt-2 text-sm text-muted">
              {cert.issuer} · {cert.year}
            </p>
            <span
              className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                hasLink ? "text-accent" : "text-muted"
              }`}
            >
              {hasLink ? (
                <>
                  View credential
                  <ExternalIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              ) : (
                "Credential link not available"
              )}
            </span>
          </Wrapper>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [tab, setTab] = useState("skills");
  const [query, setQuery] = useState("");

  return (
    <section id="skills" className="border-y border-line bg-subtle py-24 sm:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="What I work with"
          title="Skills & Certifications"
          lead="The tools and platforms I use day to day to design, ship and run cloud infrastructure."
        />

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row" delay={0.1}>
          {/* Tab switcher */}
          <div role="tablist" className="relative flex rounded-2xl border border-line bg-card p-1 shadow-sm">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
                  tab === t.id ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="skills-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md shadow-amber-600/20"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Skill search (only for the skills tab) */}
          {tab === "skills" && (
            <label className="relative block w-full sm:w-72">
              <span className="sr-only">Search skills</span>
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills…"
                className="input !pl-10"
              />
            </label>
          )}
        </Reveal>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "skills" ? <SkillsGrid query={query} /> : <CertificationsGrid />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
