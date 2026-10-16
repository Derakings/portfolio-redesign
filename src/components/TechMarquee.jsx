import { techStack } from "../data/portfolioData";

// Endless horizontal strip of technologies. The list is doubled so the loop is seamless.
export default function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div
      className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
      aria-label="Technologies I work with"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            aria-hidden={i >= techStack.length}
            className="mr-3 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2
                       text-sm font-medium text-muted shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
