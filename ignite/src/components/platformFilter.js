// src/components/PlatformFilter.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPCGames,
  fetchPlaystationGames,
  fetchXboxGames,
  fetchNintendoGames,
  fetchIosGames,
  fetchAndroidGames,
} from "../actions/gamesAction";
import "./PlatformFilter.scss";

const PlatformFilter = () => {
  const dispatch = useDispatch();
  const { activePlatform, platformGames } = useSelector((state) => state.games);

  const platforms = [
    { id: "pc", name: "PC", icon: "💻", action: fetchPCGames },
    {
      id: "playstation",
      name: "PlayStation",
      icon: "🎮",
      action: fetchPlaystationGames,
    },
    { id: "xbox", name: "Xbox", icon: "🟢", action: fetchXboxGames },
    {
      id: "nintendo",
      name: "Nintendo",
      icon: "🍎",
      action: fetchNintendoGames,
    },
    { id: "ios", name: "iOS", icon: "📱", action: fetchIosGames },
    { id: "android", name: "Android", icon: "🤖", action: fetchAndroidGames },
  ];

  const handlePlatformClick = (platform) => {
    dispatch(platform.action());
  };

  return (
    <div className="platform-filter">
      <h3 className="platform-filter__title">Filter by Platform</h3>
      <div className="platform-filter__buttons">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            className={`platform-filter__btn ${activePlatform === platform.id ? "platform-filter__btn--active" : ""}`}
            onClick={() => handlePlatformClick(platform)}
          >
            <span className="platform-filter__btn-icon">{platform.icon}</span>
            <span className="platform-filter__btn-name">{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformFilter;
