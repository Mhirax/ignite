// util.js — Resize RAWG images safely
export const smallImage = (imagePath, size = 640) => {
  // Guard: invalid input
  if (!imagePath || typeof imagePath !== 'string') {
    return "https://placehold.co/640x360/e0e0e0/aaaaaa?text=No+Image";
  }

  // Only transform if it's a RAWG media URL (exact match)
  if (
    imagePath.startsWith("https://media.rawg.io/media/") &&
    (imagePath.includes("/media/games/") || imagePath.includes("/media/screenshots/"))
  ) {
    // Replace ONLY the first occurrence of /media/(games|screenshots)/
    return imagePath.replace(
      /\/media\/(games|screenshots)\//,
      `/media/resize/${size}/-/`
    );
  }

  // If not RAWG (e.g., igdb.com, placeholder), return as-is
  return imagePath;
};