//INITIAL STATE
const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
};

//REDUCER
const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
      };
    default:
      return { ...state };
  }
};

export default gameReducer;
