import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { focusAreas, personalInfo, stats } from "../data/portfolioData";
import { scrollToSection } from "../utils/scroll";
import { trackPointer } from "../utils/pointer";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon, NamedIcon } from "./icons";

// "15+" -> { target: 15, suffix: "+" }
function parseStat(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  return match
    ? { target: Number(match[1]), suffix: match[2] }
    : { target: 0, suffix: value };
}

function Counter({ value }) {
  const { target, suffix } = parseStat(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(count, target, { duration: 1.8, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, target]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="section-container">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr]">
          {/* Left: story */}
          <div>
            <SectionHeader eyebrow="About me" title={<>Cloud engineer. <span className="text-gradient">Builder. Problem solver.</span></>} center={false} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted">{personalInfo.bio}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToSection("contact")} className="btn-primary">
                  Let&apos;s talk
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: what I do */}
          <div className="grid gap-4 sm:grid-cols-2">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={0.08 * i}>
                <div
                  onMouseMove={trackPointer}
                  className="card spotlight h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-amber-600/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-neutral-950 shadow-md shadow-amber-600/20">
                    <NamedIcon name={area.icon} />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-ink">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{area.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats band */}
        <Reveal className="mt-16" delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 p-8 shadow-2xl shadow-amber-600/20 sm:p-10">
            <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-yellow-100/20 blur-3xl" aria-hidden="true" />
            <dl className="relative grid gap-8 text-center sm:grid-cols-3 sm:divide-x sm:divide-white/20">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-sm font-medium text-white/80">{stat.label}</dt>
                  <dd className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                    <Counter value={stat.number} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
