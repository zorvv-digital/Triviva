import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";
import heroBg from "@/assets/hero.webp";

export const TICKET_DATA = {
  "WITH TRIVIVA": {
    fromCity: "KANNUR",
    fromCode: "CNN",
    toCity: "ANYWHERE",
    toCode: "AYW",
    date: "ANY DATE",
    time: "ANYTIME",
    passenger: "KAUSHAL SHIVADAS",
    message: "EXPLORE ANYWHERE ON EARTH WITH TRIVIVA!",
    image: heroBg,
  },
  HIMACHAL: {
    fromCity: "BANGALORE",
    fromCode: "BLR",
    toCity: "SHIMLA, INDIA",
    toCode: "SLV",
    date: "12 OCT 2026",
    time: "6:00 AM",
    passenger: "AARAV SHARMA",
    message: "CHILL IN THE HILLS, WE ARE ESCAPING TO SHIMLA!",
    image: "/data/packages/packages_image/himachal-package/01_Himachal.webp",
  },
  KASHMIR: {
    fromCity: "KOCHI",
    fromCode: "COK",
    toCity: "SRINAGAR, KASHMIR",
    toCode: "SXR",
    date: "18 DEC 2026",
    time: "8:30 AM",
    passenger: "MEERA NAIR",
    message: "WINTER WONDERLAND AWAITS, PACK WARM FOR SRINAGAR!",
    image: "/data/packages/packages_image/kashmir-escape/01-Kashmir.webp",
  },
  DUBAI: {
    fromCity: "KOZHIKODE",
    fromCode: "CCJ",
    toCity: "DUBAI, UAE",
    toCode: "DXB",
    date: "15 NOV 2026",
    time: "4:15 PM",
    passenger: "ZOHAN MEHTA",
    message: "DESERT DUNES AND LUXURY SHIFT, WE'RE FLYING TO DUBAI!",
    image: "/data/packages/packages_image/dubai-luxury/01-Dubai.webp",
  },
  VIETNAM: {
    fromCity: "BANGALORE",
    fromCode: "BLR",
    toCity: "HANOI, VIETNAM",
    toCode: "HAN",
    date: "22 SEP 2026",
    time: "1:10 PM",
    passenger: "NGUYEN MINH",
    message: "TIME TO EXPLORE COLONIAL LANTERNS IN HOI AN!",
    image: "/data/packages/packages_image/vietnam-discover/01-Vietnam.webp",
  },
  THAILAND: {
    fromCity: "KOZHIKODE",
    fromCode: "CCJ",
    toCity: "BANGKOK, THAILAND",
    toCode: "BKK",
    date: "16 APR 2026",
    time: "11:20 AM",
    passenger: "SOMCHAI DEE",
    message: "TROPICAL BEACH ODYSSEY, WE ARE OFF TO PHUKET!",
    image: "/data/packages/packages_image/thailand-explorer/01-Thailand.webp",
  },
  MALDIVES: {
    fromCity: "KOCHI",
    fromCode: "COK",
    toCity: "MALE, MALDIVES",
    toCode: "MLE",
    date: "23 JAN 2026",
    time: "2:00 PM",
    passenger: "SANJAY SEN",
    message: "OVERWATER VILLAS AND TURQUOISE WATER, MALDIVES AWAITS!",
    image: "/data/packages/packages_image/maldives-luxury/01-Maldives.webp",
  },
  BALI: {
    fromCity: "BANGALORE",
    fromCode: "BLR",
    toCity: "BALI, INDONESIA",
    toCode: "DPS",
    date: "27 JUL 2026",
    time: "1:00 AM",
    passenger: "NIKITA SHARMA",
    message: "PACK YOUR BAGS SWEETHEART, WE ARE FLYING OFF TO BALI!",
    image: "/data/packages/packages_image/bali-bliss/01-Bali.webp",
  },
  KERALA: {
    fromCity: "BANGALORE",
    fromCode: "BLR",
    toCity: "KOCHI, INDIA",
    toCode: "COK",
    date: "20 AUG 2026",
    time: "7:00 AM",
    passenger: "ANJALI MENON",
    message: "SERENE BACKWATERS CALL, LET'S REJUVENATE IN KERALA!",
    image: "/data/packages/packages_image/kerala-backwaters/01-Kerala.webp",
  },
  GOA: {
    fromCity: "KOCHI",
    fromCode: "COK",
    toCity: "GOA, INDIA",
    toCode: "GOI",
    date: "03 OCT 2026",
    time: "10:15 AM",
    passenger: "VIKRAM SEN",
    message: "SUN-KISSED SHORES AND HERITAGE, WE ARE GOING TO GOA!",
    image: "/data/packages/packages_image/goa-package/01-Goa.webp",
  },
};

const Barcode = () => (
  <div className="flex flex-row items-center gap-1 sm:gap-2 select-none shrink-0">
    <div className="flex flex-col gap-[1px] sm:gap-[1.5px] w-6 sm:w-8 h-20 sm:h-28 justify-between shrink-0">
      {[1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 1, 4, 2, 1, 2, 1, 3, 1, 1, 2, 4, 1, 3].map((h, i) => (
        <div key={i} className="bg-[#1d3149] w-full" style={{ height: `${h}px` }} />
      ))}
    </div>
    <span className="text-[6px] sm:text-[8px] font-black text-[#1d3149]/50 tracking-wider uppercase [writing-mode:vertical-lr] rotate-180 shrink-0">
      TRV-2026
    </span>
  </div>
);

export interface AnimatedTicketProps {
  activeDestination: string;
  activeTicket: (typeof TICKET_DATA)[keyof typeof TICKET_DATA];
  ticketVariants: any;
  prefersReducedMotion: boolean | null;
  isVisible?: boolean;
}

export function AnimatedTicket({ activeDestination, activeTicket, ticketVariants, prefersReducedMotion, isVisible = true }: AnimatedTicketProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={activeDestination}
          variants={ticketVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full relative"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, -9, 0], rotateZ: [0, 0.4, 0, -0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="w-full h-full"
          >
          <svg className="absolute inset-0 w-full h-full text-[#fcfafb] lg:drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" viewBox="0 0 500 210" fill="currentColor">
            <path d="M 16,0 L 135,0 A 9,9 0 0,0 153,0 L 484,0 A 16,16 0 0,1 500,16 L 500,194 A 16,16 0 0,1 484,210 L 153,210 A 9,9 0 0,0 135,210 L 16,210 A 16,16 0 0,1 0,194 L 0,16 A 16,16 0 0,1 16,0 Z" />
          </svg>
          <div className="absolute inset-0 flex p-3 sm:p-4 font-sans text-[#1d3149] h-full w-full select-none transform-gpu hover:scale-[1.01] transition-transform duration-300">
            <div className="w-[85px] sm:w-[120px] flex flex-col items-center justify-between pr-1.5 sm:pr-2.5 shrink-0">
              <span className="text-[7px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.2em] text-[#2d5c88] uppercase">Boarding Pass</span>
              <div className="w-18 sm:w-24 h-[75px] sm:h-[110px] overflow-hidden rounded-[8px] sm:rounded-[12px] border-[1.5px] border-[#2d5c88]/20 shadow-inner mt-1 bg-slate-100 relative">
                <img src={activeTicket.image} alt={activeDestination} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1 mt-1 sm:mt-2 text-[8px] sm:text-[11px] font-black text-[#2d5c88]">
                <span>{activeTicket.fromCode}</span>
                <Plane className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2d5c88]/80 rotate-45" />
                <span>{activeTicket.toCode}</span>
              </div>
            </div>
            <div className="w-0 border-l-[2px] sm:border-l-[3px] border-dotted border-[#2d5c88]/40 h-full mx-1.5 sm:mx-2 shrink-0" />
            <div className="flex-1 pl-2 sm:pl-3.5 pr-[50px] sm:pr-[70px] flex flex-col justify-between py-0.5 relative overflow-hidden">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex flex-col mt-0.5">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg sm:text-2xl font-black text-[#1d3149] tracking-tight leading-none">{activeTicket.fromCode}</span>
                    <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-[#2d5c88] rotate-45 transform translate-y-[1px] shrink-0" />
                    <span className="text-lg sm:text-2xl font-black text-[#1d3149] tracking-tight leading-none">{activeTicket.toCode}</span>
                  </div>
                  <div className="flex justify-between w-full mt-0.5 sm:mt-1">
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] uppercase tracking-wider truncate max-w-[45%]">{activeTicket.fromCity}</span>
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] uppercase tracking-wider truncate max-w-[45%] text-right">{activeTicket.toCity}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2 border-t border-[#2d5c88]/20 pt-1 sm:pt-2 text-left">
                  <div>
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] block uppercase tracking-wider">Name</span>
                    <span className="text-[8px] sm:text-[10px] font-black text-[#1d3149] block uppercase leading-tight truncate">KAUSHAL SHIVADAS</span>
                  </div>
                  <div>
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] block uppercase tracking-wider">Date</span>
                    <span className="text-[8px] sm:text-[10px] font-black text-[#1d3149] block uppercase leading-tight">{activeTicket.date}</span>
                  </div>
                  <div>
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] block uppercase tracking-wider">Destination</span>
                    <span className="text-[8px] sm:text-[10px] font-black text-[#1d3149] block uppercase leading-tight truncate">{activeTicket.toCity}</span>
                  </div>
                  <div>
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] block uppercase tracking-wider">Time</span>
                    <span className="text-[8px] sm:text-[10px] font-black text-[#1d3149] block uppercase leading-tight">{activeTicket.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2.5 border-t border-[#2d5c88]/20 pt-1 sm:pt-2 text-left">
                  <img src="/boarding-pass-qr.svg" className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0" alt="QR Code" />
                  <div className="min-w-0">
                    <span className="text-[6px] sm:text-[7.5px] font-bold text-[#2d5c88] block uppercase tracking-wider">Special Message</span>
                    <span className="text-[7px] sm:text-[8.5px] font-normal text-[#1d3149] uppercase tracking-tight block leading-tight">{activeTicket.message}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20">
              <Barcode />
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
