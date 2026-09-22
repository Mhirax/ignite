// src/api.js
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const base_url = "https://api.rawg.io/api/";

// ============================================
// PLATFORM IDs (RAWG platform filter values)
// ============================================
export const PLATFORM_IDS = {
  pc: "4",
  playstation: "18,187",
  xbox: "1,186", // 1 is Xbox One, NOT PC
  nintendo: "7",
  ios: "3",
  android: "21",
};

// ============================================
// GAMES (all games, optionally filtered by platform/search, paginated)
// ============================================
export const gamesURL = ({
  page = 1,
  pageSize = 24,
  ordering = "-added",
  platform,
  search,
} = {}) => {
  const params = new URLSearchParams({
    page,
    page_size: pageSize,
    ordering,
    key: API_KEY,
  });
  if (platform && PLATFORM_IDS[platform]) {
    params.set("platforms", PLATFORM_IDS[platform]);
  }
  if (search) {
    params.set("search", search);
  }
  return `${base_url}games?${params.toString()}`;
};

// ============================================
// GAME DETAILS
// ============================================
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}?key=${API_KEY}`;

export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${API_KEY}`;

// ============================================
// SEARCH
// ============================================
export const searchURL = (query) =>
  `${base_url}games?search=${encodeURIComponent(query)}&page_size=24&key=${API_KEY}`;
