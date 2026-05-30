import { useState, useEffect } from "react";

export const useGalleryStatus = () => {
  const [showGallery, setShowGallery] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/data/gallery/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.enabled === "boolean") {
          setShowGallery(data.enabled);
        }
      })
      .catch((err) => {
        console.error("Failed to load gallery config:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { showGallery, loading };
};
