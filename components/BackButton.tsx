'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
        };	  

    return (
        <Button size="lg" aria-label="Toggle favorite" variant={'outline'} className="hidden md:block h-10 m-0 fill-gray-400" onClick={handleBack}>Go back</Button>
    );
}
