import { Artwork } from '@/types/artwork';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { stripHtml } from '@/lib/htmlUtils';
import Link from 'next/link';

export type ArtworkCardProps = {
  painting: Artwork
}

export function ArtworkCard({ painting }: ArtworkCardProps) {
  const parsedDescription = stripHtml(painting.description);

  return (
    <Card className="relative overflow-hidden group cursor-pointer p-2 w-full">
      <Link href={`item/${painting.id}`} className="block h-full w-full">
        <CardHeader className='p-2'>
          <CardTitle>{painting.title}</CardTitle>
          <CardDescription>{painting.artist_title}</CardDescription>
        </CardHeader>

        <CardContent className="relative p-1 flex flex-row flex-grow items-center">
          <img
            src={`${painting.iiif_url}/${painting.image_id}/full/${painting.width},/0/default.jpg`}
            alt={painting.title}
            className="object-contain h-full w-[65%] mx-auto"
          />

          <div className='hidden md:block p-5'>
            {parsedDescription && (
              <p className="text-sm line-clamp-6">{parsedDescription}</p>
            )}
          </div>
        </CardContent>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 text-white flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300 pointer-events-none">
          {parsedDescription && (
            <p className="text-sm line-clamp-5">{parsedDescription}</p>
          )}
          <div className='mt-4 text-xl'>Click to read more</div>
        </div>
      </Link>
    </Card>
    
  );
}

