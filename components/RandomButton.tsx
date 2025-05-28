'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchRandomArtwork } from '@/lib/api';

export function RandomButton() {
  const [randomId, setRandomId] = useState<string>('');

  // Fetch random ID on mount
  useEffect(() => {
    fetchRandomArtwork().then(setRandomId);
  }, []);

  const handleClick = async () => {
    const id = await fetchRandomArtwork();
    setRandomId(id);
  };

  return (
    <Link href={randomId ? `/item/${randomId}` : '#'}>
      <Button onClick={handleClick} variant="secondary" size="sm">Random</Button>
    </Link>
  );
}
