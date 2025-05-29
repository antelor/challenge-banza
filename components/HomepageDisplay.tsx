'use client' //For Masonry
import { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,     // default = desktop
  1024: 2,        // desktop
  768: 1          // tablets 
  // < 768px: mobile view
};

export type HomepageDisplayProps = {
	artworks: Artwork[];
};

export function HomepageDisplay({ artworks }: HomepageDisplayProps) {
	return (
      <main>
        {artworks.length == 0 ?
          <div className="ml-5">
            No artworks found. Please try another search.
          </div>
        :
          <>
            <div className="hidden md:block">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto -ml-4"
                columnClassName="pl-4"
              >
                {artworks.map((artwork: Artwork) => (
                  <div key={artwork.id} className="mb-4">
                    <ArtworkCard key={artwork.id} painting={artwork} />
                  </div>
                ))}
              </Masonry>
            </div>

            <div className="block md:hidden space-y-4">
              {
                artworks.map((artwork: Artwork) => (
                  <ArtworkCard key={artwork.id} painting={artwork} />
                ))
              }
            </div>  
          </>
        }
    </main>
	);
}
