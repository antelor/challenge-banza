import { ArtworkCard } from '../components/Card';
import { Artwork } from '@/types/artwork';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export const revalidate = 0;

async function fetchArtworks(page = 1): Promise<Artwork[]> {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=20&fields=id,title,thumbnail,date_display,description,artist_id,artist_title,image_id,width,height`);
  const data = await res.json();

  //Add URL to artworks
  const artworksWithUrl: Artwork[] = data.data.map((artwork: Artwork) => ({
    ...artwork,
    iiif_url: data.config.iiif_url,
    width: artwork.width ?? 500,   // default to 500px if missing
  }));

  return artworksWithUrl;
}

type HomepageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Homepage({ searchParams }: HomepageProps) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Number(resolvedSearchParams?.page);
  const page = rawPage >= 1 ? rawPage : 1;

  const artworks: Artwork[] = await fetchArtworks(page);

  return (
    <main className="p-6">
      <div className="flex flex-row flex-wrap" >
        {
          artworks.map((artwork: Artwork) => (
            <ArtworkCard key={artwork.id} painting={artwork} />
          ))
        }
      </div>

      <Pagination>
        <PaginationContent>
          { page > 1 &&
            <PaginationItem>
              <PaginationPrevious href={`/?page=${page - 1}`} />
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </main>
  );
}
