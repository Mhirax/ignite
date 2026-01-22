// api.js

// ✅ NO SPACES after /api/
const base_url = "https://api.rawg.io/api/games";

// 🔑 PASTE YOUR REAL KEY HERE (from rawg.io)
const API_KEY = "a29ef93a191743ff9869e602e14dc1bf"; // ← REPLACE THIS!

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

// ✅ Full query WITH API key
const popular_games = `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10&key=${API_KEY}`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
