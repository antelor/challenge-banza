import { Artwork } from '@/types/artwork';
import { FavButton } from '@/components/FavButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const revalidate = 0;

async function fetchItem(id: string): Promise<Artwork | null> {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,thumbnail,date_display,description,artist_id,artist_title,image_id`);
  if (!res.ok) return null;
  const data = await res.json();
  const item = data.data;

  return {
    ...item,
    iiif_url: data.config.iiif_url,
  };
}

type ItemPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = await fetchItem(id);

  if (!item) {
    return <div className="p-6">Artwork not found</div>;
  }

  return (
    <Card className="p-6">
      <CardTitle className="text-2xl font-bold mb-4">{item.title}</CardTitle>
      <CardDescription>
        <p className="mb-2 text-gray-700">{item.artist_title}</p>
        <img
          src={`${item.iiif_url}/${item.image_id}/full/843,/0/default.jpg`}
          alt={item.title}
          className="max-w-xl"
        />
        <p className="mt-4">{item.description || "No description available."}</p>
      </CardDescription>
      <CardFooter>
        <FavButton paintingId={item.id}/>
      </CardFooter>

    </Card>
  );
}
