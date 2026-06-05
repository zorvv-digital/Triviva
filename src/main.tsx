import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import heroImage from "@/assets/hero.webp";

// Preload the main hero image with high priority immediately at startup
const link = document.createElement("link");
link.rel = "preload";
link.as = "image";
link.href = heroImage;
link.setAttribute("fetchpriority", "high");
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
