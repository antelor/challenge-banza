import { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";

export type HomepageDisplayProps = {
	artworks: Artwork[];
};

export function HomepageDisplay({ artworks }: HomepageDisplayProps) {
	return (
        <div className="flex flex-row flex-wrap" >
        {
          artworks.map((artwork: Artwork) => (
            <ArtworkCard key={artwork.id} painting={artwork} />
          ))
        }
      </div>
	);
}
