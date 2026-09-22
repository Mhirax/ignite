// src/actions/gamesAction.js
import { gamesURL, searchURL, CATEGORIES } from "../api";

// fetch() only rejects on network failure, so treat HTTP errors (bad key, rate limit) as errors too
const getJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG request failed: ${res.status}`);
  return res.json();
};

// ============================================
// GAMES FEED (all games, filtered by platform/category, paginated)
// ============================================
export const fetchGames = ({ platform = "all", category = "all", page = 1 } = {}) =>
  async (dispatch) => {
    dispatch({ type: "LOADING_GAMES" });
    try {
      const { ordering, dates } = CATEGORIES[category] || CATEGORIES.all;
      const data = await getJSON(
        gamesURL({
          page,
          platform: platform === "all" ? undefined : platform,
          ordering,
          dates,
        }),
      );
      dispatch({
        type: "FETCH_GAMES_SUCCESS",
        payload: {
          games: data.results,
          page,
          hasMore: Boolean(data.next),
          append: page > 1,
        },
      });
    } catch (error) {
      dispatch({ type: "GAMES_ERROR" });
    }
  };

// Just update the filter; GamesFeed's effect (watching activePlatform/activeCategory)
// is the single place that reacts and fetches, so a filter change never double-fetches
export const setActivePlatform = (platform) => ({
  type: "SET_ACTIVE_PLATFORM",
  payload: platform,
});

export const setActiveCategory = (category) => ({
  type: "SET_ACTIVE_CATEGORY",
  payload: category,
});

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
