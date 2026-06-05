import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Plane } from "lucide-react";
import { images } from "@/lib/images";
import { useOnScreen } from "@/hooks/useOnScreen";
import { AnimatedTicket, TICKET_DATA } from "./AnimatedTicket";

const DESTINATIONS = [
  "HIMACHAL",
  "VIETNAM",
  "DUBAI",
  "THAILAND",
  "MALDIVES",
  "KASHMIR",
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

const DESTINATION_IMAGES: Record<string, string> = {
  HIMACHAL: "/data/packages/packages_image/himachal-package/01_Himachal.webp",
  KASHMIR: "/data/packages/packages_image/kashmir-escape/01-Kashmir.webp",
  DUBAI: "/data/packages/packages_image/dubai-luxury/01-Dubai.webp",
  VIETNAM: "/data/packages/packages_image/vietnam-discover/01-Vietnam.webp",
  THAILAND: "/data/packages/packages_image/thailand-explorer/01-Thailand.webp",
  MALDIVES: "/data/packages/packages_image/maldives-luxury/01-Maldives.webp",
  BALI: "/data/packages/packages_image/bali-bliss/01-Bali.webp",
  KERALA: "/data/packages/packages_image/kerala-backwaters/01-Kerala.webp",
  GOA: "/data/packages/packages_image/goa-package/01-Goa.webp",
};



const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [destinationIndex, setDestinationIndex] = useState(0);
  const activeDestination = DESTINATIONS[destinationIndex];
  // Pause the word-cycle animation once the hero is scrolled out of view, so
  // its per-letter motion work stops competing with scroll. No visual change.
  const { ref: heroRef, onScreen: heroOnScreen } = useOnScreen<HTMLElement>();

  const activeTicket = TICKET_DATA[activeDestination as keyof typeof TICKET_DATA] || TICKET_DATA.BALI;
  const mobileTicketVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 0, y: 320 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, duration: 0.75, bounce: 0.15 },
        },
        exit: {
          opacity: 0,
          filter: "blur(8px)",
          y: -60,
          transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as const },
        },
      };
  const ticketVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 1, y: 380 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, duration: 0.75, bounce: 0.15 },
        },
        exit: {
          opacity: 0,
          filter: "blur(8px)",
          y: -140,
          transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as const },
        },
      };

  useEffect(() => {
    if (prefersReducedMotion || !heroOnScreen) return undefined;

    const intervalId = window.setInterval(() => {
      setDestinationIndex((currentIndex) => (currentIndex + 1) % DESTINATIONS.length);
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, heroOnScreen]);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-16 text-white select-none bg-[#111c16]">

      {/* Dynamic Background Image & Blend Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={activeDestination}
            src={DESTINATION_IMAGES[activeDestination] || images.hero}
            alt={`${activeDestination} background`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

        <div
          className="absolute inset-x-0 top-0 h-[320px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.25) 15%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0) 100%)"
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-[350px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, hsla(40, 25%, 98%, 1) 0%, hsla(40, 25%, 98%, 0.95) 15%, hsla(40, 25%, 98%, 0.6) 50%, hsla(40, 25%, 98%, 0) 100%)"
          }}
        />
      </div>

      {/* Top Spacer */}
      <div className="relative z-20 h-14 lg:h-20" />

      {/* Content Area — pushed down on mobile */}
      <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end max-w-7xl mx-auto mt-auto pb-6 lg:pb-0">
        {/* Left Side: Content */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start w-full relative">
          <div className="lg:hidden w-full z-0 px-5 select-none mb-6">
            <div className="w-full aspect-[2.35/1] scale-[0.72] origin-center">
              <AnimatedTicket
                activeDestination={activeDestination}
                activeTicket={activeTicket}
                ticketVariants={mobileTicketVariants}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>

          <p className="hero-enter relative z-10 text-xs font-bold tracking-[0.35em] text-white uppercase mb-2 sm:mb-4">
            Triviva Holidays
          </p>

          <h1 className="font-sans font-extrabold relative z-10 text-[clamp(3.8rem,7vw,6.5rem)] lg:text-[clamp(3.8rem,6.8vw,6.5rem)] leading-[0.95] tracking-tight text-white max-w-4xl flex flex-col">
            <span className="block">EXPLORE</span>
            <span className="mt-1 block min-h-[1.25em]">
              <AnimatedDestinationWord
                word={activeDestination}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            </span>
          </h1>

          <p className="hero-enter-desc relative z-10 mt-0.5 sm:mt-1 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-white/80 font-light">
            We design custom travel experiences to the world's most beautiful destinations. Let our local experts handle every detail while you relax and enjoy your dream vacation.
          </p>

          <div className="hero-enter-cta relative z-10 mt-6 sm:mt-8">
            <a
              href="/packages"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-sm transition-transform duration-300 hover:scale-105"
            >
              View Packages
            </a>
          </div>
        </div>

        {/* Desktop ticket */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-5 relative w-full h-[400px] select-none hero-enter-cta">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-[2.35/1]">
            <AnimatedTicket
              activeDestination={activeDestination}
              activeTicket={activeTicket}
              ticketVariants={ticketVariants}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
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
