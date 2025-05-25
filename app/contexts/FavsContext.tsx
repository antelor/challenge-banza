'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

type FavsContextType = {
  Favs: string[];

  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const FavsContext = createContext<FavsContextType | undefined>(undefined);

export const FavsProvider = ({ children }: { children: ReactNode }) => {
  const [Favs, setFavs] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavs((prev) => {
        if (prev.includes(id)) return prev;
        const updated = [...prev, id];
        return updated;
    });
  };

  const removeFavorite = (id: string) => {
    setFavs((prev) => {
        const updated = prev.filter(favId => favId !== id);
        return updated;
    });    
  };

  const isFavorite = (id: string) => Favs.includes(id);

  return (
    <FavsContext.Provider value={{ Favs, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavsContext.Provider>
  );
};

