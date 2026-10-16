import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personalInfo, projects } from "../data/portfolioData";
import { trackPointer } from "../utils/pointer";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon, ExternalIcon, GitHubIcon, StarIcon } from "./icons";

const filters = ["All", ...new Set(projects.flatMap((p) => p.categories))];

// One accent gradient per card (cycles)
const accents = [
  "from-amber-600 to-yellow-400",
  "from-yellow-500 to-amber-300",
  "from-orange-500 to-amber-300",
  "from-amber-500 to-yellow-300",
  "from-orange-400 to-yellow-300",
  "from-amber-500 to-yellow-400",
];

const repoUrl = (url) => url.replace(/\.git$/, "");

// `ref` is forwarded because AnimatePresence (popLayout) measures its direct children.
function ProjectCard({ project, index, ref }) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      onMouseMove={trackPointer}
      className="card spotlight group flex flex-col transition-shadow duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-amber-600/10"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${accents[index % accents.length]}`} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-medium text-muted">
            {String(project.id).padStart(2, "0")}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">
              <StarIcon className="h-3 w-3" />
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={repoUrl(project.githubUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-4 !py-2.5"
            >
              <GitHubIcon className="h-4 w-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2.5"
            >
              Live site
              <ExternalIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="What I've built"
          title="Featured Projects"
          lead="Real infrastructure, pipelines and deployments — filter by the technology you care about."
        />

        {/* Filter chips */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2" delay={0.1}>
          {filters.map((name) => {
            const isActive = filter === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                aria-pressed={isActive}
                className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-line bg-card text-muted hover:border-accent/50 hover:text-accent"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md shadow-amber-600/20"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{name}</span>
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <GitHubIcon className="h-4 w-4" />
            View all on GitHub
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
