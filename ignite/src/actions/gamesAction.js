// src/actions/gamesAction.js
import { gamesURL, searchURL } from "../api";

// fetch() only rejects on network failure, so treat HTTP errors (bad key, rate limit) as errors too
const getJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG request failed: ${res.status}`);
  return res.json();
};

// ============================================
// GAMES FEED (all games, optionally filtered by platform, paginated)
// ============================================
export const fetchGames = ({ platform = "all", page = 1 } = {}) =>
  async (dispatch) => {
    dispatch({ type: "LOADING_GAMES" });
    try {
      const data = await getJSON(
        gamesURL({ page, platform: platform === "all" ? undefined : platform }),
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

export const setActivePlatform = (platform) => (dispatch) => {
  dispatch({ type: "SET_ACTIVE_PLATFORM", payload: platform });
  dispatch(fetchGames({ platform, page: 1 }));
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
