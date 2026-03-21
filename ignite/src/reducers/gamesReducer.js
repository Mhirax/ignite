const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [], // 🔍 NEW: For search results
  searchLoading: false, // 🔍 NEW: Loading state for search
  searchError: false, // 🔍 NEW: Error state for search
};

// REDUCER
const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      };

    // 🔍 NEW: Loading search
    case "LOADING_SEARCH":
      return {
        ...state,
        searchLoading: true,
        searchError: false,
      };

    // 🔍 NEW: Search successful
    case "SEARCH_GAMES":
      return {
        ...state,
        searched: action.payload,
        searchLoading: false,
        searchError: false,
      };

    // 🔍 NEW: Search error
    case "SEARCH_ERROR":
      return {
        ...state,
        searchLoading: false,
        searchError: true,
        searched: [],
      };

    // 🔍 NEW: Clear search (optional)
    case "CLEAR_SEARCH":
      return {
        ...state,
        searched: [],
        searchLoading: false,
      };

    default:
      return { ...state };
  }
};

export default gamesReducer;
