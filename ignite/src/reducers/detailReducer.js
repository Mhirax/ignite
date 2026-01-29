const initialState = { game: {platforms:[]}, screen: {results: [] }, isLoading: true};

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_DETAIL":
        console.log("Payload:", action.payload); // 👈 See what’s actually coming in
        return {
          ...state,
          game: action.payload.game,
          screen: action.payload.screen,
          isLoading: false,
        };
      case "LOADING_DETAIL":  
        return {
          ...state,
          isLoading: true,
        }
      default:
        return { ...state };
    }
}

export default detailReducer;