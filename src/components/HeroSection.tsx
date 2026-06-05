import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { images } from "@/lib/images";
import { useOnScreen } from "@/hooks/useOnScreen";

const DESTINATIONS = [
  "HIMACHAL",
  "KASHMIR",
  "DUBAI",
  "VIETNAM",
  "THAILAND",
  "MALDIVES",
  "BALI",
  "KERALA",
  "GOA",
] as const;

const WORD_CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.015,
      staggerDirection: -1,
    },
  },
} as const;

const LETTER_VARIANTS = {
  hidden: {
    opacity: 0,
    y: "40%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-30%",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

interface AnimatedDestinationWordProps {
  word: string;
  prefersReducedMotion: boolean;
}

function AnimatedDestinationWord({ word, prefersReducedMotion }: AnimatedDestinationWordProps) {
  if (prefersReducedMotion) {
    return <span className="text-white font-extrabold">{word}</span>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={word}
        aria-hidden="true"
        className="inline-flex flex-wrap text-white font-extrabold"
        variants={WORD_CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {word.split("").map((character, index) => (
          <motion.span
            key={`${word}-${character}-${index}`}
            variants={LETTER_VARIANTS}
            className="inline-block origin-bottom will-change-transform"
          >
            {character === " " ? " " : character}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [destinationIndex, setDestinationIndex] = useState(0);
  const activeDestination = DESTINATIONS[destinationIndex];
  // Pause the word-cycle animation once the hero is scrolled out of view, so
  // its per-letter motion work stops competing with scroll. No visual change.
  const { ref: heroRef, onScreen: heroOnScreen } = useOnScreen<HTMLElement>();

  useEffect(() => {
    if (prefersReducedMotion || !heroOnScreen) return undefined;

    const intervalId = window.setInterval(() => {
      setDestinationIndex((currentIndex) => (currentIndex + 1) % DESTINATIONS.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, heroOnScreen]);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-16 text-white select-none bg-[#111c16]">

      {/* Static Background Image & Blend Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={images.hero}
          alt="Lush tropical background"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />

        <div
          className="absolute inset-x-0 top-0 h-[320px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.18) 8.1%, rgba(0, 0, 0, 0.16) 15.5%, rgba(0, 0, 0, 0.14) 22.5%, rgba(0, 0, 0, 0.12) 29%, rgba(0, 0, 0, 0.09) 35.3%, rgba(0, 0, 0, 0.07) 41.2%, rgba(0, 0, 0, 0.05) 47.1%, rgba(0, 0, 0, 0.03) 52.9%, rgba(0, 0, 0, 0.01) 58.8%, rgba(0, 0, 0, 0) 100%)"
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[500px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, hsla(40, 25%, 98%, 1) 0%, hsla(40, 25%, 98%, 0.95) 10%, hsla(40, 25%, 98%, 0.8) 25%, hsla(40, 25%, 98%, 0.5) 50%, hsla(40, 25%, 98%, 0.2) 75%, hsla(40, 25%, 98%, 0) 100%)"
          }}
        />
      </div>

      {/* Top Spacer */}
      <div className="relative z-20 h-20" />

      {/* Content Area */}
      <div className="relative z-20 w-full flex flex-col items-start max-w-7xl mx-auto mt-auto pb-0">
        {/* CSS keyframe entrance — zero JS per frame */}
        <p className="hero-enter text-xs font-bold tracking-[0.35em] text-white uppercase mb-4">
          Triviva • Premium Packages
        </p>

        <h1 className="font-sans font-extrabold text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-white max-w-4xl flex flex-col">
          <span className="block">EXPLORE</span>
          <span className="mt-1 block min-h-[1.25em]">
            <AnimatedDestinationWord
              word={activeDestination}
              prefersReducedMotion={Boolean(prefersReducedMotion)}
            />
          </span>
        </h1>

        <p className="hero-enter-desc mt-4 max-w-xl text-sm md:text-base leading-relaxed text-white/80 font-light">
          We design custom travel experiences to the world's most beautiful destinations. Let our local experts handle every detail while you relax and enjoy your dream vacation.
        </p>

        <div className="hero-enter-cta mt-8">
          <a
            href="/packages"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-sm transition-transform duration-300 hover:scale-105"
          >
            View Packages
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-end mt-4 md:mt-6">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-medium tracking-wider text-white/80 select-none">
            Scroll down
          </span>
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
            className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
