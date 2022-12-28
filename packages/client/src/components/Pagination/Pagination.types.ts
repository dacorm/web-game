export interface PaginationProps {
  onPageChange: (arg: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
}
