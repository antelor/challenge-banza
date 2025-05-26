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
		<Card className="p-6">
			<CardTitle className="text-2xl font-bold mb-4">{item.title}</CardTitle>
			<CardDescription>
				<p className="mb-2 text-gray-700">{item.artist_title}</p>
				<img
					src={`${item.iiif_url}/${item.image_id}/full/843,/0/default.jpg`}
					alt={item.title}
					className="max-w-xl"
				/>
				<p className="mt-4">
					{parsedDescription || "No description available."}
				</p>
			</CardDescription>

			<CardFooter>
				<FavButton paintingId={item.id} />
			</CardFooter>
		</Card>
	);
}
