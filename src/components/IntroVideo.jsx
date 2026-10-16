import { useState } from "react";
import { introVideo } from "../data/portfolioData";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { PlayIcon } from "./icons";

export default function IntroVideo() {
  const [playing, setPlaying] = useState(false);

  const thumbnail = `https://i.ytimg.com/vi/${introVideo.youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${introVideo.youtubeId}?rel=0&modestbranding=1&autoplay=1`;

  return (
    <section id="video" className="py-24 sm:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="Get to know me"
          title={introVideo.title}
          lead={introVideo.description}
        />

        <Reveal className="mx-auto mt-12 max-w-4xl" delay={0.1}>
          {/* Browser-style frame */}
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 opacity-20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-amber-600/10">
              <div className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 truncate font-mono text-xs text-muted">{introVideo.title}</span>
              </div>

              <div className="relative bg-black" style={{ aspectRatio: "16 / 9" }}>
                {playing ? (
                  <iframe
                    src={embedUrl}
                    title={introVideo.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play video: ${introVideo.title}`}
                    className="group absolute inset-0 h-full w-full cursor-pointer"
                  >
                    <img
                      src={thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-amber-700 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <PlayIcon className="ml-1 h-8 w-8" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
