import { isValidImageUrl } from "../../../lib/URLs";

export function ImageUrlErrorBoundary({ children, fallback = null, imageUrl }) {
  const isValidImage = isValidImageUrl(imageUrl);

  return <>{isValidImage ? children : fallback}</>;
}
