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
// DATE HELPERS (for the Popular/New/Upcoming categories below)
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
// CATEGORIES (ordering/date presets, layered on top of the All Games feed)
// ============================================
export const CATEGORIES = {
  all: { label: "All" },
  popular: { label: "Popular", ordering: "-rating", dates: `${lastYear},${currentDate}` },
  new: { label: "New", ordering: "-released", dates: `${lastYear},${currentDate}` },
  upcoming: { label: "Upcoming", ordering: "-added", dates: `${currentDate},${nextYear}` },
};

// ============================================
// GAMES (all games, optionally filtered by platform/category/search, paginated)
// ============================================
export const gamesURL = ({
  page = 1,
  pageSize = 24,
  ordering = "-added",
  platform,
  dates,
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
  if (dates) {
    params.set("dates", dates);
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
