import { ArtworkCard } from '@/components/Card';
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


export const revalidate = 0;

async function fetchArtworks(
  page = 1, 
  isPublicDomain?: boolean, 
  isOnView?: boolean, 
  searchQuery?: string
): Promise<Artwork[]> {
  let url: string;

  // If searchQuery exists, use the search endpoint
  if (searchQuery && searchQuery.trim() !== '') {
    url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(searchQuery)}&limit=20&fields=id,title,thumbnail,date_display,description,artist_id,artist_title,image_id,is_public_domain,is_on_view`;

  } else {
    // Otherwise, use the regular artworks endpoint
    url = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=20&fields=id,title,thumbnail,date_display,description,artist_id,artist_title,image_id,is_public_domain,is_on_view`;

    // Dynamically add filters if provided
    if (isPublicDomain !== undefined) {
      url += `&is_public_domain=${isPublicDomain}`;
    }
    if (isOnView !== undefined) {
      url += `&is_on_view=${isOnView}`;
    }
  }
  

  // Add the filters if specified
  if (isPublicDomain !== undefined) {
    url += `&is_public_domain=${isPublicDomain}`;
  }

  if (isOnView !== undefined) {
    url += `&is_on_view=${isOnView}`;
  }

  console.log(url)

  // Fetch the data
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Error fetching artworks:', res.statusText);
    return [];  // Return an empty array in case of error
  }
  const data = await res.json();
  if (!data.data || data.data.length === 0) {
    console.log('No artworks found for the given query.');
  }
  
  //Add URL to artworks
  const artworksWithUrl: Artwork[] = data.data.map((artwork: Artwork) => ({
    ...artwork,
    iiif_url: data.config.iiif_url,
    width: artwork.width ?? 500,   // default to 500px if missing
  }));

  return artworksWithUrl;
}

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
