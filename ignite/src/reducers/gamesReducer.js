// src/reducers/gamesReducer.js
const initialState = {
  popular: [],
  upcoming: [],
  newGames: [],
  searched: [],
  filteredGames: [], // ← Add this for platform filtering
  searchLoading: false,
  searchError: false,
  loading: false,
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
    case "LOADING_GAMES":
      return {
        ...state,
        loading: true,
      };
    case "FILTER_GAMES":
      return {
        ...state,
        filteredGames: action.payload,
        loading: false,
      };
    case "FILTER_ERROR":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default gamesReducer;
