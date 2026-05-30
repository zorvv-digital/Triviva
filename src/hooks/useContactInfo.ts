import { useState, useEffect } from "react";

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
  const [data, setData] = useState<ContactDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/data/contact.json")
      .then((res) => res.json())
      .then((json: ContactDetails) => {
        setData(json);
      })
      .catch((err) => console.error("Error loading contact details:", err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
