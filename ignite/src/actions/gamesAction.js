// src/actions/gamesAction.js
import {
  pcPopularURL,
  pcUpcomingURL,
  pcNewURL,
  psPopularURL,
  psUpcomingURL,
  psNewURL,
  xboxPopularURL,
  xboxUpcomingURL,
  xboxNewURL,
  nintendoPopularURL,
  nintendoUpcomingURL,
  nintendoNewURL,
  iosPopularURL,
  iosUpcomingURL,
  iosNewURL,
  androidPopularURL,
  androidUpcomingURL,
  androidNewURL,
  searchURL,
} from "../api";

// ============================================
// PLATFORM-SPECIFIC FETCH ACTIONS
// ============================================

// ----- PC -----
export const fetchPCPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "pc" });
  try {
    const res = await fetch(pcPopularURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_POPULAR",
      payload: { platform: "pc", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_POPULAR_ERROR", payload: "pc" });
  }
};

export const fetchPCUpcoming = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_UPCOMING", payload: "pc" });
  try {
    const res = await fetch(pcUpcomingURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_UPCOMING",
      payload: { platform: "pc", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_UPCOMING_ERROR", payload: "pc" });
  }
};

export const fetchPCNew = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_NEW", payload: "pc" });
  try {
    const res = await fetch(pcNewURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_NEW",
      payload: { platform: "pc", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_NEW_ERROR", payload: "pc" });
  }
};

// ----- PlayStation -----
export const fetchPSPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "playstation" });
  try {
    const res = await fetch(psPopularURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_POPULAR",
      payload: { platform: "playstation", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_POPULAR_ERROR", payload: "playstation" });
  }
};

export const fetchPSUpcoming = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_UPCOMING", payload: "playstation" });
  try {
    const res = await fetch(psUpcomingURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_UPCOMING",
      payload: { platform: "playstation", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_UPCOMING_ERROR", payload: "playstation" });
  }
};

export const fetchPSNew = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_NEW", payload: "playstation" });
  try {
    const res = await fetch(psNewURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_NEW",
      payload: { platform: "playstation", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_NEW_ERROR", payload: "playstation" });
  }
};

// ----- Xbox -----
export const fetchXboxPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "xbox" });
  try {
    const res = await fetch(xboxPopularURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_POPULAR",
      payload: { platform: "xbox", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_POPULAR_ERROR", payload: "xbox" });
  }
};

export const fetchXboxUpcoming = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_UPCOMING", payload: "xbox" });
  try {
    const res = await fetch(xboxUpcomingURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_UPCOMING",
      payload: { platform: "xbox", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_UPCOMING_ERROR", payload: "xbox" });
  }
};

export const fetchXboxNew = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_NEW", payload: "xbox" });
  try {
    const res = await fetch(xboxNewURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_NEW",
      payload: { platform: "xbox", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_NEW_ERROR", payload: "xbox" });
  }
};

// ----- Nintendo -----
export const fetchNintendoPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "nintendo" });
  try {
    const res = await fetch(nintendoPopularURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_POPULAR",
      payload: { platform: "nintendo", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_POPULAR_ERROR", payload: "nintendo" });
  }
};

export const fetchNintendoUpcoming = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_UPCOMING", payload: "nintendo" });
  try {
    const res = await fetch(nintendoUpcomingURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_UPCOMING",
      payload: { platform: "nintendo", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_UPCOMING_ERROR", payload: "nintendo" });
  }
};

export const fetchNintendoNew = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_NEW", payload: "nintendo" });
  try {
    const res = await fetch(nintendoNewURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_NEW",
      payload: { platform: "nintendo", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_NEW_ERROR", payload: "nintendo" });
  }
};

// ----- iOS -----
export const fetchIosPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "ios" });
  try {
    const res = await fetch(iosPopularURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_POPULAR",
      payload: { platform: "ios", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_POPULAR_ERROR", payload: "ios" });
  }
};

export const fetchIosUpcoming = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_UPCOMING", payload: "ios" });
  try {
    const res = await fetch(iosUpcomingURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_UPCOMING",
      payload: { platform: "ios", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_UPCOMING_ERROR", payload: "ios" });
  }
};

export const fetchIosNew = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_NEW", payload: "ios" });
  try {
    const res = await fetch(iosNewURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_NEW",
      payload: { platform: "ios", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_NEW_ERROR", payload: "ios" });
  }
};

// ----- Android -----
export const fetchAndroidPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "android" });
  try {
    const res = await fetch(androidPopularURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_POPULAR",
      payload: { platform: "android", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_POPULAR_ERROR", payload: "android" });
  }
};

export const fetchAndroidUpcoming = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_UPCOMING", payload: "android" });
  try {
    const res = await fetch(androidUpcomingURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_UPCOMING",
      payload: { platform: "android", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_UPCOMING_ERROR", payload: "android" });
  }
};

export const fetchAndroidNew = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_NEW", payload: "android" });
  try {
    const res = await fetch(androidNewURL());
    const data = await res.json();
    dispatch({
      type: "FETCH_PLATFORM_NEW",
      payload: { platform: "android", games: data.results },
    });
  } catch (error) {
    dispatch({ type: "PLATFORM_NEW_ERROR", payload: "android" });
  }
};

// ============================================
// SEARCH ACTION
// ============================================
export const searchGames = (query) => async (dispatch) => {
  dispatch({ type: "LOADING_SEARCH" });
  try {
    const res = await fetch(searchURL(query));
    const data = await res.json();
    dispatch({ type: "SEARCH_GAMES", payload: data.results });
  } catch (error) {
    dispatch({ type: "SEARCH_ERROR" });
  }
};
