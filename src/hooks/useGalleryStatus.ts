import { useQuery } from "@tanstack/react-query";

export const useGalleryStatus = () => {
  const { data, isLoading: loading } = useQuery<{ enabled: boolean }>({
    queryKey: ["gallery-status"],
    queryFn: async () => {
      const res = await fetch("/data/gallery/gallery.json");
      if (!res.ok) throw new Error("Gallery config not found");
      const json = await res.json();
      return { enabled: typeof json.enabled === "boolean" ? json.enabled : true };
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { showGallery: data?.enabled ?? true, loading };
};
