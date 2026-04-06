// src/reducers/gamesReducer.js
const initialState = {
  searched: [],
  searchLoading: false,
  searchError: false,
  activePlatform: "pc",

  // Platform-specific categories
  platformPopular: {
    pc: { games: [], loading: false, error: false },
    playstation: { games: [], loading: false, error: false },
    xbox: { games: [], loading: false, error: false },
    nintendo: { games: [], loading: false, error: false },
    ios: { games: [], loading: false, error: false },
    android: { games: [], loading: false, error: false },
  },
  platformUpcoming: {
    pc: { games: [], loading: false, error: false },
    playstation: { games: [], loading: false, error: false },
    xbox: { games: [], loading: false, error: false },
    nintendo: { games: [], loading: false, error: false },
    ios: { games: [], loading: false, error: false },
    android: { games: [], loading: false, error: false },
  },
  platformNew: {
    pc: { games: [], loading: false, error: false },
    playstation: { games: [], loading: false, error: false },
    xbox: { games: [], loading: false, error: false },
    nintendo: { games: [], loading: false, error: false },
    ios: { games: [], loading: false, error: false },
    android: { games: [], loading: false, error: false },
  },
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============================================
    // SEARCH
    // ============================================
    case "LOADING_SEARCH":
      return { ...state, searchLoading: true, searchError: false };
    case "SEARCH_GAMES":
      return { ...state, searched: action.payload, searchLoading: false };
    case "SEARCH_ERROR":
      return { ...state, searchLoading: false, searchError: true };

    // ============================================
    // PLATFORM POPULAR
    // ============================================
    case "LOADING_PLATFORM_POPULAR":
      return {
        ...state,
        platformPopular: {
          ...state.platformPopular,
          [action.payload]: {
            ...state.platformPopular[action.payload],
            loading: true,
            error: false,
          },
        },
      };
    case "FETCH_PLATFORM_POPULAR":
      return {
        ...state,
        platformPopular: {
          ...state.platformPopular,
          [action.payload.platform]: {
            games: action.payload.games,
            loading: false,
            error: false,
          },
        },
        activePlatform: action.payload.platform,
      };
    case "PLATFORM_POPULAR_ERROR":
      return {
        ...state,
        platformPopular: {
          ...state.platformPopular,
          [action.payload]: {
            ...state.platformPopular[action.payload],
            loading: false,
            error: true,
          },
        },
      };

    // ============================================
    // PLATFORM UPCOMING
    // ============================================
    case "LOADING_PLATFORM_UPCOMING":
      return {
        ...state,
        platformUpcoming: {
          ...state.platformUpcoming,
          [action.payload]: {
            ...state.platformUpcoming[action.payload],
            loading: true,
            error: false,
          },
        },
      };
    case "FETCH_PLATFORM_UPCOMING":
      return {
        ...state,
        platformUpcoming: {
          ...state.platformUpcoming,
          [action.payload.platform]: {
            games: action.payload.games,
            loading: false,
            error: false,
          },
        },
      };
    case "PLATFORM_UPCOMING_ERROR":
      return {
        ...state,
        platformUpcoming: {
          ...state.platformUpcoming,
          [action.payload]: {
            ...state.platformUpcoming[action.payload],
            loading: false,
            error: true,
          },
        },
      };

    // ============================================
    // PLATFORM NEW
    // ============================================
    case "LOADING_PLATFORM_NEW":
      return {
        ...state,
        platformNew: {
          ...state.platformNew,
          [action.payload]: {
            ...state.platformNew[action.payload],
            loading: true,
            error: false,
          },
        },
      };
    case "FETCH_PLATFORM_NEW":
      return {
        ...state,
        platformNew: {
          ...state.platformNew,
          [action.payload.platform]: {
            games: action.payload.games,
            loading: false,
            error: false,
          },
        },
      };
    case "PLATFORM_NEW_ERROR":
      return {
        ...state,
        platformNew: {
          ...state.platformNew,
          [action.payload]: {
            ...state.platformNew[action.payload],
            loading: false,
            error: true,
          },
        },
      };

    case "SET_ACTIVE_PLATFORM":
      return { ...state, activePlatform: action.payload };

    default:
      return state;
  }
};

export default gamesReducer;
