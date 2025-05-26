import { Artwork } from "@/types/artwork";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { stripHtml } from "@/lib/htmlUtils";
import { FavButton } from "./FavButton";

export type ItemCardProps = {
	item: Artwork;
};

export function ItemCard({ item }: ItemCardProps) {
	const parsedDescription = stripHtml(item.description);

	return (
		<Card className="p-0">
			<CardHeader className="mb-1 pb-2">
				<CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
				<CardDescription className="p-0">{item.artist_title}</CardDescription>
			</CardHeader>
			<CardContent>
				<img
					src={`${item.iiif_url}/${item.image_id}/full/843,/0/default.jpg`}
					alt={item.title}
					className="object-contain w-full h-auto"
				/>

				<CardDescription className="mt-6">
					{parsedDescription || "No description available for this piece."}
				</CardDescription>
			</CardContent>
			

			<CardFooter className="flex justify-end">
				<FavButton paintingId={item.id} />
			</CardFooter>
		</Card>
	);
}
