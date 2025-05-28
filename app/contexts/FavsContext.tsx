'use client'
import { createContext, useState, ReactNode } from 'react';

type FavsContextType = {
  favs: string[];

  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const FavsContext = createContext<FavsContextType | undefined>(undefined);

export const FavsProvider = ({ children }: { children: ReactNode }) => {
  const [favs, setFavs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favs');
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e);
      }
    }
    return [];
  });


  const updateLocalStorage = (newFavs: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favs', JSON.stringify(newFavs));
    }
  };


  const addFavorite = (id: string) => {
    setFavs((prev) => {
        if (prev.includes(id)) return prev;
        const updated = [...prev, id];
        updateLocalStorage(updated);
        return updated;
    });
  };

  const removeFavorite = (id: string) => {
    setFavs((prev) => {
        const updated = prev.filter(favId => favId !== id);
        updateLocalStorage(updated);
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

