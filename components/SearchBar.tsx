'use client'; // This ensures the component is client-side

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // New useRouter hook from next/navigation

  // Ensure the component is only using the router after it has mounted client-side
  useEffect(() => {
    setMounted(true); // Update after the component has mounted
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mounted) {
      router.push(`/?term=${query}`); // Programmatically navigate using router.push()
    }
  };

  // Prevent rendering before client-side hydration
  if (!mounted) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for artworks..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
