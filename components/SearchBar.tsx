'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

type SearchBarProps = {
    searchQuery: string,
    publicDomain: boolean,
    onView: boolean
}

export function SearchBar({searchQuery, publicDomain, onView} : SearchBarProps) {
  const [query, setQuery] = useState(searchQuery);
  const [mounted, setMounted] = useState(false);
  const [isPublicDomain, setIsPublicDomain] = useState(publicDomain);
  const [isOnView, setIsOnView] = useState(onView);
  const router = useRouter(); 

  // Ensure the component is only using the router after it has mounted client-side
  useEffect(() => {
    setMounted(true); 
  }, []);

  useEffect(() => {
    setIsPublicDomain(publicDomain);
    setIsOnView(onView);
  }, [publicDomain, onView]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //Prevent reload
    if (!mounted) return;
    
    const params = new URLSearchParams();

    params.set('page', '1'); // Reset page on new search/filter
    
    if (query) params.set('term', query);
    if (isPublicDomain) params.set('is_public_domain', 'true');
    if (isOnView) params.set('is_on_view', 'true');
    
    router.push(`/?${params.toString()}`);
  };

  // Prevent rendering before client-side loading
  if (!mounted) return null;

  return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for artworks..."
        />
    <label>
        <input
          type="checkbox"
          name="is_public_domain"
          value="true"
          checked={isPublicDomain}
          onChange={(e) => setIsPublicDomain(e.target.checked)}
        />
        Public Domain
      </label>

      <label>
        <input
          type="checkbox"
          name="is_on_view"
          value="true"
          checked={isOnView}
          onChange={(e) => setIsOnView(e.target.checked)}
        />
        On View
      </label>

      <button type="submit">Search</button>
    </form>
  );
}
