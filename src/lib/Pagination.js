export function generateNextCursor({ currentPage, totalPages, totalResults }) {
  let nextCursor = null;
  if (totalPages === currentPage || totalResults === 0) {
    nextCursor = null;
  } else {
    nextCursor = Number(currentPage) + 1;
  }
  return nextCursor;
}
