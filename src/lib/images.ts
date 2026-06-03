import heroBeach from "@/assets/hero-beach.jpg";
import destSantorini from "@/assets/quality/santorini.webp";
import destSahara from "@/assets/quality/sahara.webp";
import destJapan from "@/assets/quality/japan.webp";
import destBali from "@/assets/quality/breathtaking-bali-nature-picjumbo-com.webp";
import destSwiss from "@/assets/quality/swiz.webp";
import destMaldives from "@/assets/quality/maldives.webp";
import aboutHero from "@/assets/quality/swiz.webp";
import pkgPeru from "@/assets/quality/peru.webp";
import pkgIceland from "@/assets/quality/iceland.webp";

export const images = {
  hero: heroBeach,
  santorini: destSantorini,
  sahara: destSahara,
  japan: destJapan,
  bali: destBali,
  swiss: destSwiss,
  maldives: destMaldives,
  about: aboutHero,
  peru: pkgPeru,
  iceland: pkgIceland,
} as const;

export type ImageKey = keyof typeof images;

export const getImage = (key: string): string => {
  if (key.startsWith("/") || key.startsWith("http")) {
    return key;
  }
  return images[key as ImageKey] || images.hero;
};
