// src/actions/gamesAction.js
import { popularGamesURL, upcomingGamesURL, newGamesURL } from "../api";

// Action to load main game categories
export const loadGames = () => async (dispatch) => {
  try {
    // Fetch popular games
    const popularRes = await fetch(popularGamesURL());
    const popularData = await popularRes.json();

    // Fetch upcoming games
    const upcomingRes = await fetch(upcomingGamesURL());
    const upcomingData = await upcomingRes.json();

    // Fetch new games
    const newGamesRes = await fetch(newGamesURL());
    const newGamesData = await newGamesRes.json();

    // Dispatch all data
    dispatch({
      type: "FETCH_GAMES",
      payload: {
        popular: popularData.results,
        upcoming: upcomingData.results,
        newGames: newGamesData.results,
      },
    });
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

// Action to search for a game
export const searchGames = (gameName) => async (dispatch) => {
  // Show loading state
  dispatch({
    type: "LOADING_SEARCH",
  });

  try {
    // RAWG search endpoint
    const searchURL = `https://api.rawg.io/api/games?search=${gameName}&page_size=12&key=a29ef93a191743ff9869e602e14dc1bf`;

    console.log("Searching for:", gameName);
    console.log("Search URL:", searchURL);

    const response = await fetch(searchURL);
    const data = await response.json();

    console.log("Search results:", data.results.length, "games found");

    dispatch({
      type: "SEARCH_GAMES",
      payload: data.results,
    });
  } catch (error) {
    console.error("Error searching games:", error);
    dispatch({
      type: "SEARCH_ERROR",
    });
  }
};

// Action to filter games by platform
export const filterByPlatform = (platform) => async (dispatch) => {
  dispatch({ type: "LOADING_GAMES" });

  try {
    let url;
    switch (platform) {
      case "pc":
        url =
          "https://api.rawg.io/api/games?platforms=1&ordering=-rating&page_size=12";
        break;
      case "playstation":
        url =
          "https://api.rawg.io/api/games?platforms=18,187&ordering=-rating&page_size=12";
        break;
      case "xbox":
        url =
          "https://api.rawg.io/api/games?platforms=1,186&ordering=-rating&page_size=12";
        break;
      case "nintendo":
        url =
          "https://api.rawg.io/api/games?platforms=7&ordering=-rating&page_size=12";
        break;
      default:
        url = `https://api.rawg.io/api/games?ordering=-rating&page_size=12`;
    }

    const response = await fetch(`${url}&key=a29ef93a191743ff9869e602e14dc1bf`);
    const data = await response.json();

    dispatch({
      type: "FILTER_GAMES",
      payload: data.results,
    });
  } catch (error) {
    console.error("Error filtering games:", error);
    dispatch({
      type: "FILTER_ERROR",
    });
  }
};
