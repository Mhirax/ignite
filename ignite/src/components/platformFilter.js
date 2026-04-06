// src/components/PlatformFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPCPopular,
  fetchPCUpcoming,
  fetchPCNew,
  fetchPSPopular,
  fetchPSUpcoming,
  fetchPSNew,
  fetchXboxPopular,
  fetchXboxUpcoming,
  fetchXboxNew,
  fetchNintendoPopular,
  fetchNintendoUpcoming,
  fetchNintendoNew,
  fetchIosPopular,
  fetchIosUpcoming,
  fetchIosNew,
  fetchAndroidPopular,
  fetchAndroidUpcoming,
  fetchAndroidNew,
} from "../actions/gamesAction";
import "./platformFilter.scss";

const PlatformFilter = () => {
  const dispatch = useDispatch();
  const { activePlatform } = useSelector((state) => state.games);

  const platforms = [
    {
      id: "pc",
      name: "PC",
      icon: "💻",
      actions: {
        popular: fetchPCPopular,
        upcoming: fetchPCUpcoming,
        new: fetchPCNew,
      },
    },
    {
      id: "playstation",
      name: "PlayStation",
      icon: "🎮",
      actions: {
        popular: fetchPSPopular,
        upcoming: fetchPSUpcoming,
        new: fetchPSNew,
      },
    },
    {
      id: "xbox",
      name: "Xbox",
      icon: "🟢",
      actions: {
        popular: fetchXboxPopular,
        upcoming: fetchXboxUpcoming,
        new: fetchXboxNew,
      },
    },
    {
      id: "nintendo",
      name: "Nintendo",
      icon: "🍎",
      actions: {
        popular: fetchNintendoPopular,
        upcoming: fetchNintendoUpcoming,
        new: fetchNintendoNew,
      },
    },
    {
      id: "ios",
      name: "iOS",
      icon: "📱",
      actions: {
        popular: fetchIosPopular,
        upcoming: fetchIosUpcoming,
        new: fetchIosNew,
      },
    },
    {
      id: "android",
      name: "Android",
      icon: "🤖",
      actions: {
        popular: fetchAndroidPopular,
        upcoming: fetchAndroidUpcoming,
        new: fetchAndroidNew,
      },
    },
  ];

  const handlePlatformClick = (platform) => {
    dispatch(platform.actions.popular());
    dispatch(platform.actions.upcoming());
    dispatch(platform.actions.new());
  };

  return (
    <div className="platform-filter">
      <div className="platform-filter__wrapper">
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
