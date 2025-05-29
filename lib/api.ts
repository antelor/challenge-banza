import { Artwork } from "@/types/artwork";

//Creates string query for homepage artworks
export function buildQueryString(
    page: number,
    searchQuery?: string,
    is_public_domain?: boolean,
    is_on_view?: boolean
  ): string {
    const params = new URLSearchParams();
  
    const isSearch = searchQuery && searchQuery.trim() !== '';
  
    if (isSearch) {
      params.set('q', searchQuery!.trim());
    } else {
      params.set('page', String(page));
    }
  
    params.set('limit', '20');
    params.set('fields', 'id,title,thumbnail,date_display,description,artist_id,artist_title,image_id,is_public_domain,is_on_view');

    if (is_public_domain === true) {
      params.set('is_public_domain', 'true');
    }
  
    if (is_on_view === true) {
      params.set('is_on_view', 'true');
    }
  
    return params.toString();
}

//Homepage: Imports artworks JSON based on page params
export async function fetchArtworks(
    page = 1,
    is_public_domain?: boolean,
    is_on_view?: boolean,
    searchQuery?: string
  ): Promise<Artwork[]> {
    const isSearch = searchQuery && searchQuery.trim() !== '';
    const baseUrl = isSearch
      ? 'https://api.artic.edu/api/v1/artworks/search'
      : 'https://api.artic.edu/api/v1/artworks';
  
    const queryString = buildQueryString(page, searchQuery, is_public_domain, is_on_view);
  
    //Build URL based on params and search/normal homepage view
    const url = `${baseUrl}?${queryString}`;
  
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('Error fetching artworks:', res.statusText);
      return [];
    }
  
    const data = await res.json();
  
    if (!data.data || data.data.length === 0) {
      return [];
    }
  
    return data.data
    .filter((artwork: Artwork) => artwork.image_id) // Only artworks with images
    .map((artwork: Artwork) => ({
      ...artwork,
      iiif_url: data.config.iiif_url,
      width: artwork.width ?? 200, // default 200px width if missing
    }));
}
  

//Item page: Fetches information for singular artwork based on ID
export async function fetchItem(id: string): Promise<Artwork | null> {
  const baseUrl = `https://api.artic.edu/api/v1/artworks/${id}`;

  const params = new URLSearchParams();
  params.set('fields', 'id,title,thumbnail,date_display,description,artist_id,artist_title,image_id');
  const query = params.toString()

  const url = `${baseUrl}?${query}`;

  const res = await fetch(url);
  
  if (!res.ok) return null;
  const data = await res.json();
  const item = data.data;

  return {
    ...item,
    iiif_url: data.config.iiif_url,
    width: item.width ?? 500, // default 500px width if missing
  };
}

//Favorites: Fetches list of artworks based on ID array
export async function fetchArtworksByIds(idArray: string[]){
  const artworkPromises = idArray.map(async (id) => {
    const artwork = await fetchItem(id);
    if (!artwork) {
      throw new Error(`Artwork with id ${id} not found`);
    }
    return artwork;
  });

  return await Promise.all(artworkPromises);

}

export async function fetchRandomArtwork() {
  // Get total count of artworks from pagination info
  const countRes = await fetch('https://api.artic.edu/api/v1/artworks?limit=1', { cache: 'no-store' });
  const countData = await countRes.json();
  const totalArtworks = countData.pagination.total;

  // Get random page
  const perPage = 20;
  const maxPage = Math.floor(totalArtworks / perPage);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  // Fetch artworks from random page
  const pageRes = await fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=${perPage}`);
  const pageData = await pageRes.json();

  // Pick random artwork from results
  const artworks = pageData.data;
  const randomIndex = Math.floor(Math.random() * artworks.length);
  const randomArtwork = artworks[randomIndex];

  return randomArtwork.id;
}
