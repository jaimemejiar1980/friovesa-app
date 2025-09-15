import { CONSUMER_KEY, CONSUMER_SECRET } from "../constants/wordpress";

/**
 * Builds a URL with query parameters.
 *
 * @param {string} url The base URL to which query parameters will be appended.
 * @param {Object} [params={}] An object containing query parameters as key-value pairs.
 * @param {string} [extraParams=""] Additional query parameters to append to the URL.
 * @returns {string} The constructed URL with query parameters.
 * @throws {Error} If the URL is not provided.
 */
export function buildURL(url, params = {}, extraParams = {}) {
  if (!url) {
    throw new Error("URL is required");
  }

  const paramsWithKeys = {
    ...params,
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  };
  const urlParams = new URLSearchParams(paramsWithKeys);

  if (!extraParams) return `${url}?${extraParams}${urlParams.toString()}`;

  const formattedExtraParams = Object.keys(extraParams)
    .map((key) => `${key}=${extraParams[key]}`)
    .join("&");

  return `${url}?${formattedExtraParams}&${urlParams.toString()}`;
}

export function getPaginationData(response) {
  const { headers, url } = response;
  const newUrl = new URL(url);
  const page = newUrl.searchParams.get("page");

  return {
    currentPage: parseInt(page) || 1,
    totalPages: parseInt(headers.get("X-WP-TotalPages")),
    totalResults: parseInt(headers.get("X-WP-Total")),
  };
}

export function isValidImageUrl(url) {
  // Check if the input is a non-empty string and trim whitespace
  if (typeof url !== "string" || url.trim() === "") {
    return false;
  }

  try {
    // Attempt to construct a valid URL
    const parsedUrl = new URL(url);

    // Check if the URL ends with common image file extensions
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    if (
      imageExtensions.some((ext) =>
        parsedUrl.pathname.toLowerCase().endsWith(ext)
      )
    ) {
      return true; // Valid image URL
    }

    return false; // Not an image URL
  } catch {
    // If invalid URL, return the generic URL
    return false;
  }
}
