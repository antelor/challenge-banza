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

export type ArtworkCardProps = {
  painting: Artwork
}

export function ArtworkCard({ painting }: ArtworkCardProps) {
  const parsedDescription = stripHtml(painting.description);

  return (
    <Card className="relative overflow-hidden group cursor-pointer">
      <CardHeader>
        <CardTitle>{painting.title}</CardTitle>
        <CardTitle>{painting.artist_title}</CardTitle>
      </CardHeader>

      <CardContent className="relative p-0">
        <img
          src={`${painting.iiif_url}/${painting.image_id}/full/843,/0/default.jpg`}
          alt={painting.title}
          className="w-full h-auto"
        />

      </CardContent>
      {/* Full card hover overlay */}
      <div className="flex-col gap-4 absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center text-center p-4 transition-opacity duration-300 pointer-events-none">
        {parsedDescription &&
          <p className="text-sm line-clamp-5">{parsedDescription}</p>
        }
        <div>Click to read more</div>
      </div>
    </Card>
  );
}

