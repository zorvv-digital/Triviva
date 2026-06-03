import { useQuery } from "@tanstack/react-query";

export interface ContactDetails {
  agencyName: string;
  tagline: string;
  socials: {
    instagram: { handle: string; url: string };
    twitter: { handle: string; url: string };
    facebook: { handle: string; url: string };
    youtube: { handle: string; url: string };
  };
  contact: {
    address: { title: string; lines: string[] };
    phone: { title: string; lines: string[] };
    email: { title: string; lines: string[] };
    workingHours: { title: string; lines: string[] };
  };
}

export const useContactInfo = () => {
  const { data, isLoading: loading } = useQuery<ContactDetails>({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await fetch("/data/contact.json");
      if (!res.ok) throw new Error("Failed to load contact details");
      return res.json() as Promise<ContactDetails>;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { data: data ?? null, loading };
};
