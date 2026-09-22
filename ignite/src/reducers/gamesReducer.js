// src/reducers/gamesReducer.js
const initialState = {
  // All-games feed (optionally filtered by platform), paginated
  games: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: false,
  activePlatform: "all",

  // Search
  searched: [],
  searchQuery: "",
  searchLoading: false,
  searchError: false,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============================================
    // GAMES FEED
    // ============================================
    case "LOADING_GAMES":
      return { ...state, loading: true, error: false };
    case "FETCH_GAMES_SUCCESS":
      return {
        ...state,
        games: action.payload.append
          ? [...state.games, ...action.payload.games]
          : action.payload.games,
        page: action.payload.page,
        hasMore: action.payload.hasMore,
        loading: false,
      };
    case "GAMES_ERROR":
      return { ...state, loading: false, error: true };
    case "SET_ACTIVE_PLATFORM":
      return {
        ...state,
        activePlatform: action.payload,
        games: [],
        page: 1,
        hasMore: true,
      };

    // ============================================
    // SEARCH
    // ============================================
    case "LOADING_SEARCH":
      return { ...state, searchQuery: action.payload, searchLoading: true, searchError: false };
    case "SEARCH_GAMES":
      return { ...state, searched: action.payload, searchLoading: false };
    case "SEARCH_ERROR":
      return { ...state, searched: [], searchLoading: false, searchError: true };
    case "CLEAR_SEARCH":
      return { ...state, searched: [], searchQuery: "", searchLoading: false, searchError: false };

    default:
      return state;
  }
};

export default gamesReducer;
