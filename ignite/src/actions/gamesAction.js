// gamesAction.js
import { popularGamesURL, upcomingGamesURL, newGamesURL } from "../api";

export const loadGames = () => async (dispatch) => {
    // we use fetch instead of axios 
    
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
