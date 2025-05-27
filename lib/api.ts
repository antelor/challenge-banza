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
  
    params.set('limit', '10');
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
  
    const url = `${baseUrl}?${queryString}`;
  
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('Error fetching artworks:', res.statusText);
      return [];
    }
  
    const data = await res.json();
  
    if (!data.data || data.data.length === 0) {
      console.log('No artworks found for the given query.');
      return [];
    }
  
    return data.data
    .filter((artwork: Artwork) => artwork.image_id) // Only artworks with images
    .map((artwork: Artwork) => ({
      ...artwork,
      iiif_url: data.config.iiif_url,
      width: artwork.width ?? 500, // default 500px width if missing
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
    let artworks:Artwork[] = [];

    for (const id of idArray) {
        const artwork = await fetchItem(id);
        if (!artwork) {
          throw new Error(`Artwork with id ${id} not found`);
        }
        artworks.push(artwork);
    }    

    return artworks;
}