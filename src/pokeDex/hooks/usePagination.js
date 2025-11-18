import { useMemo } from 'react';

export default function usePagination(totalItems, pageSize, currentPage, siblingCount = 1) {
  // returns an array of page numbers and '…' for UI (e.g., [1,2,3,'…',10])
  return useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
      return [...leftRange, '…', totalPages];
    } else if (showLeftDots && !showRightDots) {
      const rightRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i);
      return [firstPageIndex, '…', ...rightRange];
    } else {
      const middleRange = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);
      return [firstPageIndex, '…', ...middleRange, '…', lastPageIndex];
    }
  }, [totalItems, pageSize, currentPage, siblingCount]);
}
