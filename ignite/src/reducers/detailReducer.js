const initialState = { game: {platforms:[]}, screen: {results: [] }, isLoading: true, error: false};

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_DETAIL":
        return {
          ...state,
          game: action.payload.game,
          screen: action.payload.screen,
          isLoading: false,
          error: false,
        };
      case "LOADING_DETAIL":
        return {
          ...state,
          isLoading: true,
          error: false,
        }
      case "DETAIL_ERROR":
        return {
          ...state,
          isLoading: false,
          error: true,
        }
      default:
        // Return the same object so components don't re-render for unrelated actions
        return state;
    }
}

export default detailReducer;
