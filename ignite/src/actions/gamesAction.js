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

// fetch() only rejects on network failure, so treat HTTP errors (bad key, rate limit) as errors too
const getJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG request failed: ${res.status}`);
  return res.json();
};

// ============================================
// PLATFORM-SPECIFIC FETCH ACTIONS
// ============================================

// ----- PC -----
export const fetchPCPopular = () => async (dispatch) => {
  dispatch({ type: "LOADING_PLATFORM_POPULAR", payload: "pc" });
  try {
    const data = await getJSON(pcPopularURL());
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
    const data = await getJSON(pcUpcomingURL());
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
    const data = await getJSON(pcNewURL());
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
    const data = await getJSON(psPopularURL());
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
    const data = await getJSON(psUpcomingURL());
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
    const data = await getJSON(psNewURL());
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
    const data = await getJSON(xboxPopularURL());
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
    const data = await getJSON(xboxUpcomingURL());
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
    const data = await getJSON(xboxNewURL());
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
    const data = await getJSON(nintendoPopularURL());
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
    const data = await getJSON(nintendoUpcomingURL());
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
    const data = await getJSON(nintendoNewURL());
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
    const data = await getJSON(iosPopularURL());
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
    const data = await getJSON(iosUpcomingURL());
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
    const data = await getJSON(iosNewURL());
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
    const data = await getJSON(androidPopularURL());
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
    const data = await getJSON(androidUpcomingURL());
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
    const data = await getJSON(androidNewURL());
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
  dispatch({ type: "LOADING_SEARCH", payload: query });
  try {
    const data = await getJSON(searchURL(query));
    dispatch({ type: "SEARCH_GAMES", payload: data.results || [] });
  } catch (error) {
    dispatch({ type: "SEARCH_ERROR" });
  }
};

export const clearSearch = () => ({ type: "CLEAR_SEARCH" });
