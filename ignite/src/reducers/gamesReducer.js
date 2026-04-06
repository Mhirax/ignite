// src/reducers/gamesReducer.js
const initialState = {
  popular: [],
  upcoming: [],
  newGames: [],
  searched: [],
  searchLoading: false,
  searchError: false,
  loading: false,
  // ============================================
  // 🎮 NEW: Platform games state
  // ============================================
  platformGames: {
    pc: { games: [], loading: false, error: false },
    playstation: { games: [], loading: false, error: false },
    xbox: { games: [], loading: false, error: false },
    nintendo: { games: [], loading: false, error: false },
    ios: { games: [], loading: false, error: false },
    android: { games: [], loading: false, error: false },
  },
  activePlatform: "pc", // Currently selected platform
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      };

    case "SEARCH_GAMES":
      return {
        ...state,
        searched: action.payload,
        searchLoading: false,
      };

    case "LOADING_SEARCH":
      return {
        ...state,
        searchLoading: true,
        searchError: false,
      };

    case "SEARCH_ERROR":
      return {
        ...state,
        searchLoading: false,
        searchError: true,
      };

    // ============================================
    // 🎮 NEW: Platform games reducers
    // ============================================
    case "LOADING_PLATFORM_GAMES":
      return {
        ...state,
        platformGames: {
          ...state.platformGames,
          [action.payload]: {
            ...state.platformGames[action.payload],
            loading: true,
            error: false,
          },
        },
      };

    case "FETCH_PLATFORM_GAMES":
      return {
        ...state,
        platformGames: {
          ...state.platformGames,
          [action.payload.platform]: {
            games: action.payload.games,
            loading: false,
            error: false,
          },
        },
        activePlatform: action.payload.platform,
      };

    case "PLATFORM_ERROR":
      return {
        ...state,
        platformGames: {
          ...state.platformGames,
          [action.payload]: {
            ...state.platformGames[action.payload],
            loading: false,
            error: true,
          },
        },
      };

    case "SET_ACTIVE_PLATFORM":
      return {
        ...state,
        activePlatform: action.payload,
      };

    default:
      return state;
  }
};

export default gamesReducer;
