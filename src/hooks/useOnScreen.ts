import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is currently on screen (continuously — fires on
 * both enter AND leave, unlike useInView which latches once). Also reports
 * false while the browser tab is hidden.
 *
 * Use this to pause per-frame / interval-driven animations when the user can't
 * see them, so they stop competing with scrolling for the main thread + GPU.
 */
export function useOnScreen<T extends Element = HTMLDivElement>(
  options?: Pick<IntersectionObserverInit, "rootMargin" | "threshold">
) {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);
  const inViewRef = useRef(false);
  const tabVisibleRef = useRef(
    typeof document === "undefined" ? true : document.visibilityState !== "hidden"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setOnScreen(inViewRef.current && tabVisibleRef.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        update();
      },
      // Keep animating slightly before the section scrolls into view so there's
      // no visible "pop" — purely a head-start, no change to what's rendered.
      { threshold: 0, rootMargin: "200px", ...options }
    );
    observer.observe(el);

    const handleVisibility = () => {
      tabVisibleRef.current = document.visibilityState !== "hidden";
      update();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, onScreen };
}
