import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type Props = {
  page: number;
  totalPages: number;
} & React.ComponentProps<typeof Pagination>;
export function Paginator({ page, totalPages, ...props }: Props) {
  const left = Math.max(page - 1, 2);
  const right = Math.min(page + 1, totalPages - 1);
  const middle = Math.min(Math.max(page, 3), totalPages - 2);

  return (
    <Pagination {...props}>
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={page === 2 ? '/' : `/page/${page - 1}`}
            ></PaginationPrevious>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationLink href='/' isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        {page >= 4 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        {page <= totalPages - 2 ? (
          <PaginationItem>
            <PaginationLink href={`/page/${left}`} isActive={page === left}>
              {left}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {totalPages > 2 ? (
          <PaginationItem>
            <PaginationLink href={`/page/${middle}`} isActive={page === middle}>
              {middle}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {page >= 3 ? (
          <PaginationItem>
            <PaginationLink href={`/page/${right}`} isActive={page === right}>
              {right}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {page <= totalPages - 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        {totalPages > 1 ? (
          <PaginationItem>
            <PaginationLink
              href={`/page/${totalPages}`}
              isActive={page === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {page < totalPages ? (
          <PaginationItem>
            <PaginationNext href={`/page/${page + 1}`}></PaginationNext>
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
