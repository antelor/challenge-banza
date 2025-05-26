import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationHandleProps = {
    page: number,
    term?: string;
    isPublicDomain?: boolean;
    isOnView?: boolean;
}

export function PaginationHandler({page, term, isPublicDomain, isOnView} : PaginationHandleProps) {

    function buildPageLink(page: number) {
        const params = new URLSearchParams();
      
        params.set('page', String(page));
        if (term) params.set('term', term);
        if (isPublicDomain !== undefined) params.set('is_public_domain', String(isPublicDomain));
        if (isOnView !== undefined) params.set('is_on_view', String(isOnView));

        return `/?${params.toString()}`;
      }
      
	return (
        <Pagination>
            <PaginationContent>
            { page > 1 &&
                <PaginationItem>
                <PaginationPrevious href={buildPageLink(page - 1)} />
                </PaginationItem>
            }
            <PaginationItem>
                <PaginationLink href="#">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
                <PaginationNext href={buildPageLink(page + 1)} />
            </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
