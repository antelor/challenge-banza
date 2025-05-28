'use client';

import { useContext, useState, useEffect } from 'react';
import { FavsContext } from '@/app/contexts/FavsContext';
import { fetchArtworksByIds } from '@/lib/api';
import { Artwork } from '@/types/artwork';
import { ItemCard } from '@/components/ItemCard';
import Masonry from 'react-masonry-css';
import Link from 'next/link';

const breakpointColumnsObj = {
    default: 3,     // default = desktop
    1024: 2,        // desktop
    768: 1          // tablets 
    // < 768px: mobile view
};

export default function FavoritesPage() {
    const context = useContext(FavsContext);
    if (!context) throw new Error('FavoriteButton must be used within FavsProvider');
    const { favs } = context;
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

    // Delay rendering until after hydration
    useEffect(() => {
        setHasMounted(true);
    }, []);

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

    // Avoid hydration mismatch
    if (!hasMounted) return null;
      
    return (
        <main className="p-6 space-y-4">
            {favs.length === 0 ? (
                <div>No favorites yet.</div>
                ) : artworks.length === 0 ? (
                <div>Loading favorites...</div>
                ) : 
                <>
                    <div className="hidden md:block">
                        <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-4"
                        columnClassName="pl-4 flex flex-col space-y-4"
                        >
                            {artworks.map((favItem: Artwork, key: number) => (
                                <Link key={key} href={`item/${favItem.id}`} className="block h-full w-full">
                                    <ItemCard item={favItem} isFavPage={true}/>
                                </Link>
                            ))}
                        </Masonry>
                    </div>

                    <div className="block md:hidden space-y-4">
                        {artworks.map((favItem: Artwork, key: number) => (
                            <Link key={key} href={`item/${favItem.id}`} className="block h-full w-full">
                                <ItemCard item={favItem} isFavPage={true}/>
                            </Link>
                        ))}
                    </div>
                </>
            }
        </main>
    );
}
