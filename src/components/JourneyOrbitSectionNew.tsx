import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";
import { getImage } from "@/lib/images";

type TripStory = {
  id: string;
  title: string;
  location: string;
  image: string;
  story: string;
};

const fallbackStories: TripStory[] = [
  {
    id: "agra-taj",
    location: "Agra, India",
    title: "Taj Mahal Sunrise",
    image: "/data/stories/Memory1.webp",
    story: "A magical morning on the Yamuna river, watching the rising sun paint the marble dome of the Taj Mahal in golden hues."
  },
  {
    id: "thailand-beach",
    location: "Phi Phi Islands, Thailand",
    title: "Maya Bay Shoreline",
    image: "/data/stories/Memory2.webp",
    story: "Walking along the warm turquoise shores, tucked between towering limestone cliffs in a hidden tropical paradise."
  },
  {
    id: "nepal-annapurna",
    location: "Annapurna, Nepal",
    title: "Himalayan Golden Hour",
    image: "/data/stories/Memory3.webp",
    story: "Watching the setting sun turn the snowy peaks of the Annapurna range into blazing gold from the terrace of a cozy mountain lodge."
  },
  {
    id: "kashmir-pahalgam",
    location: "Pahalgam, Kashmir",
    title: "Lidder River Valley",
    image: "/data/stories/Memory4.webp",
    story: "A quiet stroll along the rushing Lidder River, surrounded by towering pine forests and the snowy peaks of Kashmir."
  }
];

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

const JourneyOrbitSectionNew = () => {
  const [stories, setStories] = useState<TripStory[]>(fallbackStories);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasEntered = true;
  const shouldReduceMotion = useReducedMotion();

  const { ref: sectionRef, isVisible: sectionVisible } = useInView<HTMLElement>();

  // Card geometry configuration variables
  const cardWidth = 280; 
  const maxVisible = 5;
  const overlap = 0.58;
  const spreadDeg = 24;
  const depthPx = 60; 
  const tiltXDeg = 8;
  const activeLiftPx = 18; 
  const activeScale = 1.03;
  const inactiveScale = 0.93;
  const perspectivePx = 1100;
  const loop = true;

  const len = stories.length;
  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const goNext = useCallback(() => {
    setActiveIndex((current) => wrapIndex(current + 1, len));
  }, [len]);

  useEffect(() => {
    fetch("/data/stories/last_trips.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load story deck.");
        }
        return response.json();
      })
      .then((data: TripStory[]) => {
        if (data && data.length > 0) {
          setStories(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || stories.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      goNext();
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion, stories.length, goNext]);

  const activeStory = stories[activeIndex];
  const openState = hasEntered;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, #fbfbf9 15%, #f6efe5 65%, hsl(var(--background)) 100%)"
      }}
      className="relative overflow-visible z-20 pt-16 pb-12 md:pt-20 md:pb-16"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.06),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.04),transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="max-w-2xl text-slate-900">
            <span
              className={`reveal${sectionVisible ? " is-visible" : ""} mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-slate-600 backdrop-blur-md`}
            >
              Trip memories
            </span>

            <h2
              className={`reveal${sectionVisible ? " is-visible" : ""} font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl text-slate-900`}
              style={{ transitionDelay: "0.06s" }}
            >
              Memories that <span className="text-primary">move into frame</span>
            </h2>

            <p
              className={`reveal${sectionVisible ? " is-visible" : ""} mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base`}
              style={{ transitionDelay: "0.14s" }}
            >
              A curated collection of unforgettable memories from our travels: cards begin as a compact stack, open when the section enters view, and then rotate with a clear, cinematic rhythm.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800 shadow-md"
              >
                Explore this trip
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                View packages
              </Link>
            </div>
          </div>

          <div className="relative">
            <div 
              className="relative mx-auto h-[23rem] w-full max-w-[46rem] overflow-visible md:h-[28rem] flex items-start justify-center orbit-container-shift max-md:-translate-x-32"
              style={{
                perspective: `${perspectivePx}px`,
              }}
            >
              {stories.map((story, i) => {
                const off = signedOffset(i, activeIndex, len, loop);
                const abs = Math.abs(off);
                const visible = abs <= maxOffset;

                if (!visible) return null;

                const rotateZ = off * stepDeg;
                const x = off * cardSpacing;
                const y = abs * 8;
                const z = -abs * depthPx;

                const isActive = off === 0;
                const scale = isActive ? activeScale : inactiveScale;
                const lift = isActive ? -activeLiftPx : 0;
                const rotateX = isActive ? 0 : tiltXDeg;
                const zIndex = 100 - abs;

                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(i);
                    }}
                    style={{ 
                      zIndex,
                      transform: `translate3d(${openState ? x : 0}px, ${openState ? y + lift : 0}px, ${z}px) scale(${openState ? scale : 0.76}) rotate(${openState ? rotateZ : 0}deg) rotateX(${openState ? rotateX : 0}deg)`,
                      opacity: openState ? 1 : 0.14,
                      transition: shouldReduceMotion
                        ? "none"
                        : "transform 850ms cubic-bezier(0.4, 0, 0.2, 1), opacity 850ms cubic-bezier(0.4, 0, 0.2, 1)",
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                      backfaceVisibility: "hidden",
                    }}
                    className="group absolute left-1/2 top-4 w-[min(64vw,16.5rem)] md:w-[17.5rem] -translate-x-1/2 overflow-hidden rounded-[1.75rem] bg-transparent p-0 text-left shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-500 transform-gpu"
                  >
                    <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden isolate transform-gpu">
                      <img
                        src={getImage(story.image)}
                        alt={story.title}
                        decoding="async"
                        loading="lazy"
                        className={`h-full w-full object-cover transition-transform duration-700 ${
                          isActive ? "group-hover:scale-105" : "scale-[1.02]"
                        }`}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.08)_30%,rgba(2,6,23,0.72)_100%)]" />

                      <div className="absolute top-4 left-4 rounded-full bg-slate-900/40 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-sm">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                          {story.location}
                        </p>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <h3 className="font-display text-2xl font-bold leading-[0.95] text-white">
                          {story.title}
                        </h3>
                        {story.story && (
                          <p className="mt-3 max-w-[90%] text-sm leading-6 text-white/80 line-clamp-2">
                            {story.story}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyOrbitSectionNew;
