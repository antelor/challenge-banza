import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 bg-white border-b shadow-sm flex items-center justify-between">
      <Link href="/" className="text-lg font-bold">
        Art Institute of Chicago
      </Link>
      <div className="space-x-2">
        <Link href="/favorites">
          <Button variant="outline" size="sm">Favorites</Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost" size="sm">About</Button>
        </Link>
      </div>
    </nav>
  );
}
