// src/components/PlatformGames.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPCGames } from "../actions/gamesAction";
import Game from "./Game";
import "./platformGames.scss";

const PlatformGames = () => {
  const dispatch = useDispatch();
  const { platformGames, activePlatform } = useSelector((state) => state.games);

  const currentPlatform = platformGames[activePlatform];
  const games = currentPlatform?.games || [];
  const loading = currentPlatform?.loading || false;
  const error = currentPlatform?.error || false;

  useEffect(() => {
    // Load default platform (PC) when component mounts
    if (games.length === 0 && !loading) {
      dispatch(fetchPCGames());
    }
  }, []);

  const platformNames = {
    pc: "PC Gaming",
    playstation: "PlayStation Games",
    xbox: "Xbox Games",
    nintendo: "Nintendo Switch",
    ios: "iOS Games",
    android: "Android Games",
  };

  if (loading) {
    return (
      <div className="platform-games">
        <h2 className="platform-games__title">
          {platformNames[activePlatform]}
        </h2>
        <div className="platform-games__loading">
          <div className="spinner"></div>
          <p>Loading games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="platform-games">
        <h2 className="platform-games__title">
          {platformNames[activePlatform]}
        </h2>
        <div className="platform-games__error">
          <p>❌ Failed to load games. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-games">
      <div className="platform-games__header">
        <h2 className="platform-games__title">
          {platformNames[activePlatform]}
        </h2>
        <span className="platform-games__count">{games.length} games</span>
      </div>
      <div className="platform-games__grid">
        {games.map((game) => (
          <Game
            key={game.id}
            name={game.name}
            released={game.released}
            id={String(game.id)}
            image={game.background_image}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatformGames;
