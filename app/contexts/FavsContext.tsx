'use client'
import { createContext, useEffect, useState, ReactNode } from 'react';

type FavsContextType = {
  favs: string[];

  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const FavsContext = createContext<FavsContextType | undefined>(undefined);

export const FavsProvider = ({ children }: { children: ReactNode }) => {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favs');
    if (stored) {
      try {
        setFavs(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favs));
  }, [favs]);


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

  const isFavorite = (id: string) => favs.includes(id);

  return (
    <FavsContext.Provider value={{ favs, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavsContext.Provider>
  );
};

