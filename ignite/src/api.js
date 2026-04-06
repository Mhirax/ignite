// src/api.js
const API_KEY = "a29ef93a191743ff9869e602e14dc1bf";

const base_url = "https://api.rawg.io/api/";

// ============================================
// 🚀 FIXED: NO DATE FILTERS - FETCH ALL GAMES!
// ============================================

// Popular games - Top rated of ALL TIME (no date limit)
const popular_games = `games?ordering=-rating&page_size=20&key=${API_KEY}`;

// Upcoming games - Most anticipated (no date limit)
const upcoming_games = `games?ordering=-added&page_size=20&key=${API_KEY}`;

// New games - Recently released (still needs some date range, let's keep last 2 years)
const getTwoYearsAgo = () => {
  const year = new Date().getFullYear() - 2;
  return `${year}-01-01`;
};
const twoYearsAgo = getTwoYearsAgo();
const currentDate = new Date().toISOString().split("T")[0];
const newGames = `games?dates=${twoYearsAgo},${currentDate}&ordering=-released&page_size=20&key=${API_KEY}`;

// Platform-specific endpoints (already good, no changes needed)
export const pcGamesURL = () =>
  `${base_url}games?platforms=1&ordering=-rating&page_size=20&key=${API_KEY}`;

export const playstationGamesURL = () =>
  `${base_url}games?platforms=18,187&ordering=-rating&page_size=20&key=${API_KEY}`;

export const xboxGamesURL = () =>
  `${base_url}games?platforms=1,186&ordering=-rating&page_size=20&key=${API_KEY}`;

export const appleGamesURL = () =>
  `${base_url}games?platforms=3&ordering=-rating&page_size=20&key=${API_KEY}`;

export const nintendoGamesURL = () =>
  `${base_url}games?platforms=7&ordering=-rating&page_size=20&key=${API_KEY}`;

export const gamesByPlatformURL = (platformId) =>
  `${base_url}games?platforms=${platformId}&ordering=-rating&page_size=20&key=${API_KEY}`;

// Main game endpoints - FIXED (no date filters)
export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;

// Game details (already good)
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}?key=${API_KEY}`;

// Game screenshots (already good)
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${API_KEY}`;

console.log("✅ API Ready - Fetching ALL games (no date limits)");
