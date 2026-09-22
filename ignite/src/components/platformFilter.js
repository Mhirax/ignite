// src/components/PlatformFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlatform } from "../actions/gamesAction";
import "./platformFilter.scss";

const PLATFORMS = [
  { id: "all", name: "All" },
  { id: "pc", name: "PC" },
  { id: "playstation", name: "PlayStation" },
  { id: "xbox", name: "Xbox" },
  { id: "nintendo", name: "Nintendo" },
  { id: "ios", name: "iOS" },
  { id: "android", name: "Android" },
];

const PlatformFilter = () => {
  const dispatch = useDispatch();
  const { activePlatform } = useSelector((state) => state.games);

  const handlePlatformClick = (platformId) => {
    if (platformId === activePlatform) return;
    dispatch(setActivePlatform(platformId));
  };

  return (
    <div className="platform-filter">
      <div className="platform-filter__wrapper">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            className={`platform-filter__btn ${activePlatform === platform.id ? "platform-filter__btn--active" : ""}`}
            onClick={() => handlePlatformClick(platform.id)}
          >
            <span className="platform-filter__btn-name">{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformFilter;
