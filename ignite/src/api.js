// src/api.js
const API_KEY = "a29ef93a191743ff9869e602e14dc1bf";
const base_url = "https://api.rawg.io/api/";

// ============================================
// PLATFORM IDs from RAWG
// ============================================
// PC: 1
// PlayStation 5: 187
// PlayStation 4: 18
// Xbox Series X/S: 186
// Xbox One: 1
// Nintendo Switch: 7
// iOS: 3
// Android: 21

// ============================================
// PLATFORM-SPECIFIC ENDPOINTS
// ============================================

// PC Games
export const pcGamesURL = () => 
  `${base_url}games?platforms=1&ordering=-rating&page_size=24&key=${API_KEY}`;

// PlayStation Games (PS4 + PS5)
export const playstationGamesURL = () => 
  `${base_url}games?platforms=18,187&ordering=-rating&page_size=24&key=${API_KEY}`;

// Xbox Games (Xbox One + Series X/S)
export const xboxGamesURL = () => 
  `${base_url}games?platforms=1,186&ordering=-rating&page_size=24&key=${API_KEY}`;

// Nintendo Switch Games
export const nintendoGamesURL = () => 
  `${base_url}games?platforms=7&ordering=-rating&page_size=24&key=${API_KEY}`;

// iOS Games
export const iosGamesURL = () => 
  `${base_url}games?platforms=3&ordering=-rating&page_size=24&key=${API_KEY}`;

// Android Games
export const androidGamesURL = () => 
  `${base_url}games?platforms=21&ordering=-rating&page_size=24&key=${API_KEY}`;

// Generic platform filter (for any platform ID)
export const gamesByPlatformURL = (platformIds) => 
  `${base_url}games?platforms=${platformIds}&ordering=-rating&page_size=24&key=${API_KEY}`;