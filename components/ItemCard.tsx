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
import { BackButton } from "./BackButton";

export type ItemCardProps = {
	item: Artwork;
	isFavPage: boolean
};

export function ItemCard({ item, isFavPage }: ItemCardProps) {
	const parsedDescription = stripHtml(item.description);

	return (
		<Card className="p-0 md:flex md:flex-row opacity-0 animate-fade-in">
			<CardContent className="p-6">
				<img
					src={`${item.iiif_url}/${item.image_id}/full/${item.width},/0/default.jpg`}
					alt={item.title}
					className="object-contain w-full h-auto"
				/>
			</CardContent>
			
			<div className="md:w-1/2 flex flex-col">
				<CardHeader className="mb-1 pb-2">
					<CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
					<CardDescription className="p-0 text-base">{item.artist_title}</CardDescription>
					{item.dimensions &&
						<CardDescription className="p-0 text-xs">{item.dimensions.split(';')[0].trim() }</CardDescription>
					}				
				</CardHeader>

				<CardContent>
					<CardDescription className="mt-6">
						{parsedDescription || "No description available for this piece."}
					</CardDescription>
				</CardContent>

				<CardFooter className="flex justify-end gap-5">
					<FavButton paintingId={item.id} />
					{ !isFavPage &&
						<BackButton/>
					}
				</CardFooter>
			</div>
		</Card>
	);
}
