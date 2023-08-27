import { useState, useEffect } from "react";

const useFavorite = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favoriteContacts");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoriteContacts", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = (contactId: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, contactId]);
  };

  const removeFromFavorites = (contactId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favId) => favId !== contactId),
    );
  };

  return { favorites, addToFavorites, removeFromFavorites };
};

export default useFavorite;
