import { ArtworkCard } from '@/components/ArtworkCard';
import { Artwork } from '@/types/artwork';
import { SearchBar } from '@/components/SearchBar';
import { fetchArtworks } from '@/lib/api';
import { PaginationHandler } from '@/components/PaginationHandler';

export const revalidate = 0;

type HomepageProps = {
  searchParams: { 
    page?: string; 
    is_public_domain?: string; 
    is_on_view?: string,
    term?: string
  };
};

export default async function Homepage({ searchParams }: HomepageProps) {
  const { page = '1', is_public_domain, is_on_view, term } = await searchParams;
  const rawPage = Number(page);
  const finalPage = rawPage >= 1 ? rawPage : 1;

  const searchQuery = term ?? '';

  const artworks: Artwork[] = await fetchArtworks(finalPage, is_public_domain == 'true', is_on_view == 'true', searchQuery);

  return (
    <main className="p-6">

      <SearchBar publicDomain={is_public_domain == 'true'} onView={is_on_view == 'true'} />

      <div className="flex flex-row flex-wrap" >
        {
          artworks.map((artwork: Artwork) => (
            <ArtworkCard key={artwork.id} painting={artwork} />
          ))
        }
      </div>

      <PaginationHandler page={finalPage} term={term} isPublicDomain={is_public_domain == 'true'} isOnView={is_on_view == 'true'}/>
    </main>
  );
}
