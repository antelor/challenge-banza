import { Artwork } from '@/types/artwork';
import { FavButton } from '@/components/FavButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchItem } from '@/lib/api';
import { ItemCard } from '@/components/ItemCard';

export const revalidate = 0;

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
    <ItemCard item={item} />
  );
}
