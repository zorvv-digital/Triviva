import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
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

type DeckState = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  zIndex: number;
  height: number;
};

const deckLayouts: Record<"mobile" | "tablet" | "desktop", DeckState[]> = {
  mobile: [
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 40, height: 360 },
    { x: 26, y: 54, scale: 0.88, rotate: 7, opacity: 0.74, zIndex: 20, height: 260 },
    { x: -10, y: 118, scale: 0.76, rotate: -8, opacity: 0.56, zIndex: 5, height: 220 },
    { x: -18, y: -34, scale: 0.84, rotate: -5, opacity: 0.44, zIndex: 10, height: 92 },
  ],
  tablet: [
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 40, height: 420 },
    { x: 188, y: 14, scale: 0.9, rotate: 8, opacity: 0.82, zIndex: 30, height: 340 },
    { x: -160, y: 110, scale: 0.82, rotate: -10, opacity: 0.66, zIndex: 20, height: 280 },
    { x: -24, y: -40, scale: 0.88, rotate: -7, opacity: 0.48, zIndex: 10, height: 110 },
  ],
  desktop: [
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 40, height: 440 },
    { x: 230, y: 22, scale: 0.92, rotate: 10, opacity: 0.84, zIndex: 30, height: 350 },
    { x: -200, y: 126, scale: 0.84, rotate: -12, opacity: 0.68, zIndex: 20, height: 290 },
    { x: -30, y: -52, scale: 0.9, rotate: -8, opacity: 0.52, zIndex: 10, height: 112 },
  ],
};

const JourneyOrbitSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [stories, setStories] = useState<TripStory[]>(fallbackStories);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetch("/data/stories/last_trips.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load story deck.");
        }
        return response.json();
      })
      .then((data: TripStory[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
        }
      })
      .catch(() => {
        setStories(fallbackStories);
      });
  }, []);

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.34 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered || isPaused || shouldReduceMotion || stories.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % stories.length);
    }, 5600);

    return () => window.clearInterval(intervalId);
  }, [hasEntered, isPaused, shouldReduceMotion, stories.length]);

  const activeStory = stories[activeIndex];
  const deckMode = viewportWidth < 768 ? "mobile" : viewportWidth < 1024 ? "tablet" : "desktop";
  const layouts = deckLayouts[deckMode];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#faf5ec_0%,#f6eee2_42%,#efe5d7_100%)] py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-700 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Story deck
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.6 }}
              className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-6xl"
            >
              Open the deck,
              <br />
              <span className="text-gradient">watch it unfold</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="mt-6 max-w-xl text-sm leading-7 text-slate-600 md:text-base"
            >
              The cards start closed like a stack of postcards. Once this section enters the viewport,
              they fan open, reveal their stories, and keep rotating with a clear, visible rhythm.
            </motion.p>

            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: "Stories", value: stories.length.toString().padStart(2, "0") },
                { label: "State", value: hasEntered ? "Open" : "Closed" },
                { label: "Focus", value: activeStory?.month ?? "—" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * index, duration: 0.45 }}
                  className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-md"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
                    {item.label}
                  </div>
                  <div className="mt-2 font-display text-xl font-bold text-slate-950 md:text-2xl">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/packages/${activeStory?.id ?? "packages"}`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore this trip
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur-md transition-colors hover:bg-white/90"
              >
                View packages
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto h-[34rem] w-full max-w-[46rem] overflow-visible md:h-[41rem]">
              {stories.map((story, index) => {
                const relativeIndex = (index - activeIndex + stories.length) % stories.length;
                const layout = layouts[relativeIndex] ?? layouts[0];
                const isActive = relativeIndex === 0;
                const isOpen = hasEntered;

                return (
                  <motion.article
                    key={story.id}
                    initial={false}
                    animate={{
                      x: isOpen ? layout.x : 0,
                      y: isOpen ? layout.y : 0,
                      scale: isOpen ? layout.scale : 0.8,
                      rotate: isOpen ? layout.rotate : 0,
                      opacity: isOpen ? layout.opacity : 0.14,
                      height: isOpen ? layout.height : 92,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 18,
                      mass: 1,
                      delay: isOpen ? index * 0.06 : index * 0.03,
                    }}
                    style={{ zIndex: layout.zIndex }}
                    className="group absolute left-1/2 top-1/2 w-[min(76vw,20rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.9rem] border border-white/70 bg-white/65 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-md"
                  >
                    <div className="relative flex h-full flex-col overflow-hidden">
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/8 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-700">
                            <CalendarDays className="h-3 w-3" />
                            {story.month}
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-950 shadow-sm">
                          <Star className="h-3 w-3 fill-current text-amber-500" />
                          deck
                        </div>
                      </div>

                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={getImage(story.image)}
                          alt={story.title}
                          className={`h-full w-full object-cover transition-transform duration-700 ${
                            isActive ? "group-hover:scale-105" : "scale-[1.03]"
                          }`}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.18)_34%,rgba(2,6,23,0.82)_100%)]" />

                        <motion.div
                          initial={false}
                          animate={{
                            opacity: (hasEntered && isActive) ? 1 : 0,
                            y: (hasEntered && isActive) ? 0 : 28,
                          }}
                          transition={{ duration: 0.35, delay: 0.15 }}
                          className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/60">
                            {isActive ? "Now in focus" : "Travel note"}
                          </p>
                          <h3 className="mt-2 text-lg font-bold leading-tight md:text-xl">
                            {story.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-white/78">
                            {story.story}
                          </p>
                          <p className="mt-3 text-xs italic leading-5 text-white/72">
                            “{story.quote}”
                          </p>
                          <div className="mt-4 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                            <span>{story.location}</span>
                            <span>{story.tag}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {!hasEntered && (
                      <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.5)_100%)]"
                        animate={shouldReduceMotion ? undefined : { opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                    )}
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current - 1 + stories.length) % stories.length)}
                aria-label="Previous story"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-950/10 bg-white/70 text-slate-900 backdrop-blur-md transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % stories.length)}
                aria-label="Next story"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-950/10 bg-white/70 text-slate-900 backdrop-blur-md transition-colors hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {stories.map((story, index) => (
                <button
                  key={story.id}
                  type="button"
                  aria-label={`Show story ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-slate-950" : "w-2.5 bg-slate-950/20 hover:bg-slate-950/35"
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 text-center text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              {hasEntered ? (isPaused ? "Paused" : "Playing") : "Closed"} • opens on scroll
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyOrbitSection;
