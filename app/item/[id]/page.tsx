import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
    <main className='flex flex-col gap-3 items-center'>
      <ItemCard item={item} isFavPage={false}/>
      <Link href="/" className='block md:hidden'>
        <Button variant="secondary" size="lg">Go back</Button>
      </Link>
    </main>
  );
}
