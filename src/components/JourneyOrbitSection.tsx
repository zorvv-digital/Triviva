import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, MapPin, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getImage } from "@/lib/images";

type TripStory = {
  id: string;
  title: string;
  location: string;
  image: string;
  month: string;
  story: string;
  quote: string;
  tag: string;
};

const fallbackStories: TripStory[] = [
  {
    id: "santorini-escape",
    title: "Santorini Dreamscape",
    location: "Santorini, Greece",
    image: "santorini",
    month: "May",
    story: "Golden rooftops, cobalt domes, and a cliffside dinner that turned the whole evening into a slow-moving postcard.",
    quote: "The sunset felt staged just for us.",
    tag: "Sunset story",
  },
  {
    id: "japan-cultural",
    title: "Japan: Land of the Rising Sun",
    location: "Tokyo, Kyoto & Osaka",
    image: "japan",
    month: "May",
    story: "Morning trains, neon evenings, and temple stillness — each city revealed a completely different rhythm.",
    quote: "Every stop felt like a new chapter.",
    tag: "City drift",
  },
  {
    id: "maldives-luxury",
    title: "Maldives Paradise",
    location: "South Malé Atoll",
    image: "maldives",
    month: "April",
    story: "Overwater silence, coral-blue water, and a luxury escape that moved as softly as the tide itself.",
    quote: "It was impossible not to slow down here.",
    tag: "Waterline",
  },
  {
    id: "swiss-alpine",
    title: "Swiss Alpine Adventure",
    location: "Interlaken & Zermatt",
    image: "swiss",
    month: "June",
    story: "Mountain light, crisp air, and dramatic peaks gave the trip a bold, clean visual cadence.",
    quote: "The landscape kept resetting the mood.",
    tag: "High altitude",
  },
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

const JourneyOrbitSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [stories, setStories] = useState<TripStory[]>(fallbackStories);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(true); // Default to true so auto-play works immediately on load
  const [viewportWidth, setViewportWidth] = useState(1280);
  const shouldReduceMotion = useReducedMotion();

  // Card geometry configuration variables
  const cardWidth = 336;
  const maxVisible = 5;
  const overlap = 0.58;
  const spreadDeg = 24;
  const depthPx = 70;
  const tiltXDeg = 8;
  const activeLiftPx = 22;
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

  const goPrev = useCallback(() => {
    setActiveIndex((current) => wrapIndex(current - 1, len));
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
    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || stories.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      goNext();
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion, stories.length, goNext]);

  const activeStory = stories[activeIndex];
  const openState = hasEntered;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #fbfbf9 0%, #f6efe5 100%)"
      }}
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.06),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.04),transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="max-w-2xl text-slate-900">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-slate-600 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Travel archive
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.6 }}
              className="font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl text-slate-900"
            >
              Stories that <span className="text-primary">move into frame</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.5 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base"
            >
              A redesigned travel archive: cards begin as a compact stack, open when the section enters view, and then rotate with a clear, cinematic rhythm.
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/packages/${activeStory?.id ?? "packages"}`}
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
              className="relative mx-auto h-[29rem] w-full max-w-[46rem] overflow-visible md:h-[35rem] flex items-start justify-center"
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
                const y = abs * 8; // subtle arc-down feel
                const z = -abs * depthPx;

                const isActive = off === 0;
                const scale = isActive ? activeScale : inactiveScale;
                const lift = isActive ? -activeLiftPx : 0;
                const rotateX = isActive ? 0 : tiltXDeg;
                const zIndex = 100 - abs;

                return (
                  <motion.button
                    key={story.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(i);
                    }}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: y + 40,
                            x,
                            rotateZ,
                            rotateX,
                            scale,
                          }
                    }
                    animate={{
                      opacity: openState ? 1 : 0.14,
                      x: openState ? x : 0,
                      y: openState ? y + lift : 0,
                      scale: openState ? scale : 0.76,
                      rotateZ: openState ? rotateZ : 0,
                      rotateX: openState ? rotateX : 0,
                    }}
                    style={{ 
                      zIndex,
                      transformStyle: "preserve-3d",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 480, // Snappy transitions
                      damping: 120,
                      mass: 0.3,
                    }}
                    className="group absolute left-1/2 top-4 w-[min(76vw,21rem)] -translate-x-1/2 overflow-hidden rounded-[1.75rem] bg-transparent p-0 text-left shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-shadow duration-500 transform-gpu"
                  >
                    <div 
                      className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden isolate transform-gpu"
                      style={{
                        transform: `translateZ(${z}px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={getImage(story.image)}
                        alt={story.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ${
                          isActive ? "group-hover:scale-105" : "scale-[1.02]"
                        }`}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.08)_30%,rgba(2,6,23,0.72)_100%)]" />

                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-950 shadow-sm">
                        <Star className="h-3 w-3 fill-current text-amber-500" />
                        <span>{isActive ? "4.84" : "4.90"}</span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
                            {story.month}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
                            {story.tag}
                          </p>
                        </div>
                        <h3 className="font-display text-2xl font-bold leading-[0.95] text-white">
                          {story.title}
                        </h3>
                        <p className="mt-3 max-w-[90%] text-sm leading-6 text-white/80 line-clamp-2">
                          {story.story}
                        </p>
                      </div>

                      {!openState && (
                        <motion.div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.34)_100%)]"
                          animate={shouldReduceMotion ? undefined : { opacity: [0.7, 0.18, 0.7] }}
                          transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

             <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goPrev()}
                aria-label="Previous story"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goNext()}
                aria-label="Next story"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {stories.map((story, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={story.id}
                    type="button"
                    aria-label={`Show story ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-8 bg-slate-800" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyOrbitSection;
