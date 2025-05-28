import { HomepageDisplay } from '@/components/HomepageDisplay';
import { Artwork } from '@/types/artwork';
import { SearchBar } from '@/components/SearchBar';
import { fetchArtworks } from '@/lib/api';
import { PaginationHandler } from '@/components/PaginationHandler';

export const revalidate = 0;

type HomepageProps = {
  searchParams: Promise<{
    page?: string; 
    is_public_domain?: string; 
    is_on_view?: string,
    term?: string
  }>;
};

export default async function Homepage({ searchParams }: HomepageProps) {
  const { page = '1', is_public_domain, is_on_view, term } = await searchParams;
  const rawPage = Number(page);
  const finalPage = rawPage >= 1 ? rawPage : 1;

  const searchQuery = term ?? '';

  const artworks: Artwork[] = await fetchArtworks(finalPage, is_public_domain == 'true', is_on_view == 'true', searchQuery);

  return (
    <main className="p-4 max-w-md mx-auto space-y-6 md:max-w-full">
      <SearchBar searchQuery={searchQuery} publicDomain={is_public_domain == 'true'} onView={is_on_view == 'true'} />

      <HomepageDisplay artworks={artworks}/>

      <PaginationHandler page={finalPage} term={term} isPublicDomain={is_public_domain == 'true'} isOnView={is_on_view == 'true'}/>
    </main>
  );
}
