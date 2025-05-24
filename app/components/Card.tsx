import { Artwork } from '@/types/artwork';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export type ArtworkCardProps = {
  painting: Artwork
}

export function ArtworkCard({painting} : ArtworkCardProps) {
  return (
    <Card>
        <CardHeader>
          <CardTitle>{painting.title} - {painting.artist_title} </CardTitle>
        </CardHeader>

        <CardContent>
          <img src={painting.iiif_url+'/'+painting.image_id+'/full/843,/0/default.jpg'} alt="" />
        </CardContent>
    </Card>
  );
}
