'use client';

import { useContext } from 'react';
import { FavsContext } from '@/app/contexts/FavsContext';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';

export function FavButton({ paintingId }: { paintingId: string }) {
  const context = useContext(FavsContext);
  if (!context) throw new Error('FavoriteButton must be used within FavsProvider');
  
  const { addFavorite, removeFavorite, isFavorite } = context;

  const toggleFavorite = () => {
    if (isFavorite(paintingId)) {
        removeFavorite(paintingId);
    } else {
        addFavorite(paintingId);
    }
  };

  return (
    <Button onClick={toggleFavorite} aria-label="Toggle favorite">
      <HeartIcon
        className={`w-6 h-6 transition-colors ${
          isFavorite(paintingId) ? 'text-red-600' : 'text-gray-400'
        }`}
      />
    </Button>
  );
}
