// src/actions/gamesAction.js
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  pcGamesURL,
  playstationGamesURL,
  xboxGamesURL,
  nintendoGamesURL,
  iosGamesURL,
  androidGamesURL,
} from "../api";

// Existing loadGames function (keep as is)
export const loadGames = () => async (dispatch) => {
  try {
    const popularRes = await fetch(popularGamesURL());
    const popularData = await popularRes.json();

    const upcomingRes = await fetch(upcomingGamesURL());
    const upcomingData = await upcomingRes.json();

    const newGamesRes = await fetch(newGamesURL());
    const newGamesData = await newGamesRes.json();

    dispatch({
      type: "FETCH_GAMES",
      payload: {
        popular: popularData.results,
        upcoming: upcomingData.results,
        newGames: newGamesData.results,
      },
    });
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

// ============================================
// 🎮 NEW: Platform-specific actions
// ============================================

export const fetchPCGames = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_GAMES", payload: "pc" });
  try {
    const response = await fetch(pcGamesURL());
    const data = await response.json();
    dispatch({
      type: "FETCH_PLATFORM_GAMES",
      payload: { platform: "pc", games: data.results },
    });
  } catch (error) {
    console.error("Error fetching PC games:", error);
    dispatch({ type: "PLATFORM_ERROR", payload: "pc" });
  }
};

export const fetchPlaystationGames = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_GAMES", payload: "playstation" });
  try {
    const response = await fetch(playstationGamesURL());
    const data = await response.json();
    dispatch({
      type: "FETCH_PLATFORM_GAMES",
      payload: { platform: "playstation", games: data.results },
    });
  } catch (error) {
    console.error("Error fetching PlayStation games:", error);
    dispatch({ type: "PLATFORM_ERROR", payload: "playstation" });
  }
};

export const fetchXboxGames = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_GAMES", payload: "xbox" });
  try {
    const response = await fetch(xboxGamesURL());
    const data = await response.json();
    dispatch({
      type: "FETCH_PLATFORM_GAMES",
      payload: { platform: "xbox", games: data.results },
    });
  } catch (error) {
    console.error("Error fetching Xbox games:", error);
    dispatch({ type: "PLATFORM_ERROR", payload: "xbox" });
  }
};

export const fetchNintendoGames = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_GAMES", payload: "nintendo" });
  try {
    const response = await fetch(nintendoGamesURL());
    const data = await response.json();
    dispatch({
      type: "FETCH_PLATFORM_GAMES",
      payload: { platform: "nintendo", games: data.results },
    });
  } catch (error) {
    console.error("Error fetching Nintendo games:", error);
    dispatch({ type: "PLATFORM_ERROR", payload: "nintendo" });
  }
};

export const fetchIosGames = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_GAMES", payload: "ios" });
  try {
    const response = await fetch(iosGamesURL());
    const data = await response.json();
    dispatch({
      type: "FETCH_PLATFORM_GAMES",
      payload: { platform: "ios", games: data.results },
    });
  } catch (error) {
    console.error("Error fetching iOS games:", error);
    dispatch({ type: "PLATFORM_ERROR", payload: "ios" });
  }
};

export const fetchAndroidGames = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_GAMES", payload: "android" });
  try {
    const response = await fetch(androidGamesURL());
    const data = await response.json();
    dispatch({
      type: "FETCH_PLATFORM_GAMES",
      payload: { platform: "android", games: data.results },
    });
  } catch (error) {
    console.error("Error fetching Android games:", error);
    dispatch({ type: "PLATFORM_ERROR", payload: "android" });
  }
};

// Search action (keep as is)
export const searchGames = (gameName) => async (dispatch) => {
  dispatch({ type: "LOADING_SEARCH" });
  try {
    const searchURL = `https://api.rawg.io/api/games?search=${gameName}&page_size=24&key=a29ef93a191743ff9869e602e14dc1bf`;
    const response = await fetch(searchURL);
    const data = await response.json();
    dispatch({
      type: "SEARCH_GAMES",
      payload: data.results,
    });
  } catch (error) {
    console.error("Error searching games:", error);
    dispatch({ type: "SEARCH_ERROR" });
  }
};
