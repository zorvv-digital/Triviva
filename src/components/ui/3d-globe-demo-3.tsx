import { useState, useEffect } from "react";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

export default function Globe3DDemoThird() {
  const [primaryColor, setPrimaryColor] = useState("#10b981");

  useEffect(() => {
    const val = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (val) {
      setPrimaryColor(`hsl(${val})`);
    }
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-white/[0.08] shadow-2xl my-16">
      {/* Ambient Decorative Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 lg:p-16">
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">Global Travel network</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-tight">
            Explore the World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-300">
              Without Limits
            </span>
          </h2>
          
          <p className="text-neutral-400 font-body text-lg leading-relaxed mb-8">
            Embark on curated adventures across our premium, handpicked global destinations. Toggle interactive routes, track destinations in real-time, and let your journey begin.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex cursor-pointer items-center justify-center rounded-xl bg-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-primary/95 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98">
              Plan Your Adventure
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-98">
              Explore Packages
            </button>
          </div>
        </div>

        {/* Right Globe Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center h-[350px] md:h-[450px] lg:h-[500px] w-full mt-8 lg:mt-0">
          {/* Radial radar ring highlights behind the globe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[80%] h-[80%] rounded-full border border-white/[0.03] animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[65%] h-[65%] rounded-full border border-white/[0.05] border-dashed animate-[spin_80s_linear_infinite]" />
            <div className="absolute w-[50%] h-[50%] rounded-full border border-primary/10 animate-[spin_40s_linear_infinite]" />
          </div>

          <div className="w-full h-full relative z-10 flex items-center justify-center">
            <Globe3D
              className="h-full w-full max-w-[450px] max-h-[450px]"
              markers={sampleMarkers}
              config={{
                atmosphereColor: primaryColor,
                atmosphereIntensity: 1.8,
                atmosphereBlur: 3.5,
                bumpScale: 6,
                autoRotateSpeed: 0.7,
                enableZoom: true,
                enablePan: false,
                radius: 2.1,
                showWireframe: true,
                wireframeColor: primaryColor
              }}
              onMarkerClick={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
