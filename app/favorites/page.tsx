'use client';

import { useContext, useState, useEffect } from 'react';
import { FavsContext } from '@/app/contexts/FavsContext';
import { fetchArtworksByIds } from '@/lib/api';
import { Artwork } from '@/types/artwork';
import { ItemCard } from '@/components/ItemCard';

export default function FavoritesPage() {
    const context = useContext(FavsContext);
    if (!context) throw new Error('FavoriteButton must be used within FavsProvider');
    const { addFavorite, removeFavorite, favs } = context;
    const [artworks, setArtworks] = useState<Artwork[]>([]);


    useEffect(() => {
        if (!favs || favs.length === 0){
            setArtworks([]);  // clear artworks when no favorites
            return;
        } 
    
        const loadArtworks = async () => {
          const result = await fetchArtworksByIds(favs);
          setArtworks(result);
        };
    
        loadArtworks();
      }, [favs]);
    
      
    return (
        <main className="p-6">
            {favs ? //To avoid flicker 
                artworks.map((favItem: Artwork, key: number) => (
                    <ItemCard key={key} item={favItem}/>
                    ))
                :
                <div>Loading favorites</div>
            }
        </main>
    );
}
