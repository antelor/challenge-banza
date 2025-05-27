'use client';

import { useContext, useState, useEffect } from 'react';
import { FavsContext } from '@/app/contexts/FavsContext';
import { fetchArtworksByIds } from '@/lib/api';
import { Artwork } from '@/types/artwork';
import { ItemCard } from '@/components/ItemCard';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 3,     // default = desktop
    1024: 2,        // desktop
    768: 1          // tablets 
    // < 768px: mobile view
};

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
        <main className="p-6 space-y-4">
            {favs ? //To avoid flicker 
                <>
                <div className="hidden md:block">
                    <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-4"
                    columnClassName="pl-4 flex flex-col space-y-4"
                    >
                        {artworks.map((favItem: Artwork, key: number) => (
                            <ItemCard key={key} item={favItem} isFavPage={true}/>
                        ))}
                    </Masonry>
                </div>

                <div className="block md:hidden space-y-4">
                    {artworks.map((favItem: Artwork, key: number) => (
                        <ItemCard key={key} item={favItem} isFavPage={true}/>
                    ))}
                </div>
                </>
                :
                <div>Loading favorites</div>
            }
        </main>
    );
}
