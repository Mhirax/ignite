// src/api.js
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const base_url = "https://api.rawg.io/api/";

// ============================================
// DATE HELPERS
// ============================================
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  return day < 10 ? `0${day}` : day;
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// ============================================
// PLATFORM IDs
// ============================================
// PC: 4
// PlayStation: 18 (PS4), 187 (PS5)
// Xbox: 1 (Xbox One), 186 (Series X/S)  (note: 1 is Xbox One, NOT PC)
// Nintendo: 7
// iOS: 3
// Android: 21

// ============================================
// PLATFORM-SPECIFIC POPULAR/UPCOMING/NEW ENDPOINTS
// ============================================

// ----- PC -----
export const pcPopularURL = () =>
  `${base_url}games?platforms=4&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12&key=${API_KEY}`;
export const pcUpcomingURL = () =>
  `${base_url}games?platforms=4&dates=${currentDate},${nextYear}&ordering=-added&page_size=12&key=${API_KEY}`;
export const pcNewURL = () =>
  `${base_url}games?platforms=4&dates=${lastYear},${currentDate}&ordering=-released&page_size=12&key=${API_KEY}`;

// ----- PlayStation -----
export const psPopularURL = () =>
  `${base_url}games?platforms=18,187&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12&key=${API_KEY}`;
export const psUpcomingURL = () =>
  `${base_url}games?platforms=18,187&dates=${currentDate},${nextYear}&ordering=-added&page_size=12&key=${API_KEY}`;
export const psNewURL = () =>
  `${base_url}games?platforms=18,187&dates=${lastYear},${currentDate}&ordering=-released&page_size=12&key=${API_KEY}`;

// ----- Xbox -----
export const xboxPopularURL = () =>
  `${base_url}games?platforms=1,186&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12&key=${API_KEY}`;
export const xboxUpcomingURL = () =>
  `${base_url}games?platforms=1,186&dates=${currentDate},${nextYear}&ordering=-added&page_size=12&key=${API_KEY}`;
export const xboxNewURL = () =>
  `${base_url}games?platforms=1,186&dates=${lastYear},${currentDate}&ordering=-released&page_size=12&key=${API_KEY}`;

// ----- Nintendo -----
export const nintendoPopularURL = () =>
  `${base_url}games?platforms=7&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12&key=${API_KEY}`;
export const nintendoUpcomingURL = () =>
  `${base_url}games?platforms=7&dates=${currentDate},${nextYear}&ordering=-added&page_size=12&key=${API_KEY}`;
export const nintendoNewURL = () =>
  `${base_url}games?platforms=7&dates=${lastYear},${currentDate}&ordering=-released&page_size=12&key=${API_KEY}`;

// ----- iOS -----
export const iosPopularURL = () =>
  `${base_url}games?platforms=3&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12&key=${API_KEY}`;
export const iosUpcomingURL = () =>
  `${base_url}games?platforms=3&dates=${currentDate},${nextYear}&ordering=-added&page_size=12&key=${API_KEY}`;
export const iosNewURL = () =>
  `${base_url}games?platforms=3&dates=${lastYear},${currentDate}&ordering=-released&page_size=12&key=${API_KEY}`;

// ----- Android -----
export const androidPopularURL = () =>
  `${base_url}games?platforms=21&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12&key=${API_KEY}`;
export const androidUpcomingURL = () =>
  `${base_url}games?platforms=21&dates=${currentDate},${nextYear}&ordering=-added&page_size=12&key=${API_KEY}`;
export const androidNewURL = () =>
  `${base_url}games?platforms=21&dates=${lastYear},${currentDate}&ordering=-released&page_size=12&key=${API_KEY}`;

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

