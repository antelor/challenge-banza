'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";


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
  const [filtersOpen, setFiltersOpen] = useState(publicDomain || onView);
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
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='flex justify-center items-center gap-3'>
        <div className="w-3/4">
          <Input
            id="searchQuery"
            type="text"
            placeholder="Search for artworks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3"
          />
        </div>

        <Button type="submit" className="w-auto">
          Search
        </Button>
      </div>

      <div className="w-auto">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 ml-3 mt-1 hover:underline"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
          aria-controls="filters-section"
        >
          {filtersOpen ? "Hide" : "Show"} Advanced Filters 
        </button>
        <div className={`flex space-x-2 ml-3 mt-2 ${filtersOpen ? "block" : "hidden"}`}>
          <div className="flex items-center space-x-1">
            <Checkbox
              id="publicDomain"
              checked={isPublicDomain}
              onCheckedChange={(checked) => setIsPublicDomain(!!checked)}
            />
            <Label htmlFor="publicDomain" className="select-none">
              Public Domain
            </Label>
          </div>

          <div className="flex items-center space-x-1">
            <Checkbox
              id="onView"
              checked={isOnView}
              onCheckedChange={(checked) => setIsOnView(!!checked)}
            />
            <Label htmlFor="onView" className="select-none">
              On View
            </Label>
          </div>
        </div>
      </div>
    </form>
  );
}
