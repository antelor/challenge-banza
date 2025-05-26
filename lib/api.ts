import { Artwork } from "@/types/artwork";

//Homepage: Imports artworks JSON based on page params
export async function fetchArtworks(
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

//Item page: Fetches information for singular artwork based on ID
export async function fetchItem(id: string): Promise<Artwork | null> {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,thumbnail,date_display,description,artist_id,artist_title,image_id`);
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.data;
  
    return {
      ...item,
      iiif_url: data.config.iiif_url,
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