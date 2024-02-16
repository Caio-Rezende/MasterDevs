import { useEffect, useState } from "react";

export function useLocation() {
  const [locationHash, setLocationHash] = useState("");
  useEffect(() => {
    const updateHash = () => setLocationHash(location.hash);

    window.addEventListener("hashchange", updateHash);
    updateHash();

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return locationHash;
}
