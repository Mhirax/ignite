//WORKING ON API

// 🔑 PASTE YOUR REAL KEY HERE (from rawg.io)
const API_KEY = "a29ef93a191743ff9869e602e14dc1bf"; // ← REPLACE THIS!

//getting date data
//currentmonth
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};

//currentday
const getCurrentDay = () => {
  const day = new Date().getDate();
  return day < 10 ? `0${day}` : day;
};

//currentYear
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// ✅ Full query WITH API key
const base_url = "https://api.rawg.io/api/";
const popular_games = `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10&key=${API_KEY}`;
const upcoming_games = `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10&key=${API_KEY}`;
const newGames = `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=10&key=${API_KEY}`;

// src/api.js - Add these new functions

// Platform-specific endpoints
export const pcGamesURL = () => 
  `${base_url}games?platforms=1&ordering=-rating&page_size=12&key=${API_KEY}`;

export const playstationGamesURL = () => 
  `${base_url}games?platforms=18,187&ordering=-rating&page_size=12&key=${API_KEY}`;

export const xboxGamesURL = () => 
  `${base_url}games?platforms=1,186&ordering=-rating&page_size=12&key=${API_KEY}`;

export const appleGamesURL = () => 
  `${base_url}games?platforms=3&ordering=-rating&page_size=12&key=${API_KEY}`;

export const nintendoGamesURL = () => 
  `${base_url}games?platforms=7&ordering=-rating&page_size=12&key=${API_KEY}`;

// Get games by specific platform ID
export const gamesByPlatformURL = (platformId) => 
  `${base_url}games?platforms=${platformId}&ordering=-rating&page_size=12&key=${API_KEY}`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;

//GAME DETAILS
export const gameDetailsURL = (game_id) =>
  //API KEY must be passed👇
  `${base_url}games/${game_id}?key=${API_KEY}`;

console.log("Upcoming URL:", upcomingGamesURL());

//Game screenshots
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${API_KEY}`;
