'use client';

import { useContext } from 'react';
import { FavsContext } from '@/app/contexts/FavsContext';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import { MouseEvent } from 'react';


export function FavButton({ paintingId }: { paintingId: string }) {
  const context = useContext(FavsContext);
  if (!context) throw new Error('FavoriteButton must be used within FavsProvider');
  const { addFavorite, removeFavorite, isFavorite } = context;
  const favorite = isFavorite(paintingId);

  const toggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
		e.preventDefault(); 

    if (isFavorite(paintingId)) {
        removeFavorite(paintingId);
    } else {
        addFavorite(paintingId);
    }
  };

  return (
    <Button onClick={toggleFavorite} aria-label="Toggle favorite" variant={'outline'} className="m-0 fill-gray-400 h-10">
      {favorite ? "Remove from " : "Add to "} favorites
      <HeartIcon
        className={`w-6 transition-colors ${
          favorite ? 'text-red-600 fill-red-600' : 'text-gray-400 fill-gray-400'
        }`}
      />
    </Button>
  );
}
