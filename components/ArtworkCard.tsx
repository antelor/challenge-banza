import { Artwork } from '@/types/artwork';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { stripHtml } from '@/utils/htmlUtils';
import Link from 'next/link';

export type ArtworkCardProps = {
  painting: Artwork
}

export function ArtworkCard({ painting }: ArtworkCardProps) {
  const parsedDescription = stripHtml(painting.description);

  return (
    <Card className="relative overflow-hidden group cursor-pointer">
      <Link href={`item/${painting.id}`} className="block h-full w-full">
        <CardHeader>
          <CardTitle>{painting.title}</CardTitle>
          <CardTitle>{painting.artist_title}</CardTitle>
        </CardHeader>

        <CardContent className="relative p-0 flex items-center justify-center h-60">
          <img
            src={`${painting.iiif_url}/${painting.image_id}/full/${painting.width},/0/default.jpg`}
            alt={painting.title}
            className="max-h-full max-w-full object-contain"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 text-white flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300 pointer-events-none">
            {parsedDescription && (
              <p className="text-sm line-clamp-5">{parsedDescription}</p>
            )}
            <div>Click to read more</div>
          </div>
        </CardContent>
      </Link>
    </Card>
    
  );
}

