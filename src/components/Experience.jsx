import { experience } from "../data/portfolioData";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="Career"
          title={<>Work <span className="text-gradient">experience.</span></>}
          description="Where I apply cloud engineering and DevOps in practice."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          {experience.map((entry) => (
            <Reveal key={entry.company}>
              <article className="card relative overflow-hidden p-6 sm:p-8">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-500 to-yellow-300" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">{entry.company}</p>
                <h3 className="mt-2 text-xl font-bold text-ink sm:text-2xl">{entry.role}</h3>
                <p className="mt-3 leading-relaxed text-muted">{entry.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
