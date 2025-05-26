import { ArtworkCard } from '@/components/ArtworkCard';
import { Artwork } from '@/types/artwork';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchBar } from '@/components/SearchBar';
import { fetchArtworks } from '@/lib/api';

export const revalidate = 0;

type HomepageProps = {
  searchParams: { 
    page?: string; 
    isPublicDomain?: boolean; 
    isOnView?: boolean,
    term?: string
  };
};

export default async function Homepage({ searchParams }: HomepageProps) {
  const { page = '1', isPublicDomain, isOnView, term } = await searchParams;
  const rawPage = Number(page);
  const finalPage = rawPage >= 1 ? rawPage : 1;

  const searchQuery = term ?? '';

  const artworks: Artwork[] = await fetchArtworks(finalPage, isPublicDomain, isOnView, searchQuery);

  return (
    <main className="p-6">

      <SearchBar />

      <div className="flex flex-row flex-wrap" >
        {
          artworks.map((artwork: Artwork) => (
            <ArtworkCard key={artwork.id} painting={artwork} />
          ))
        }
      </div>

      <Pagination>
        <PaginationContent>
          { finalPage > 1 &&
            <PaginationItem>
              <PaginationPrevious href={`/?page=${finalPage - 1}`} />
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationLink href="#">{finalPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/?page=${finalPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </main>
  );
}
