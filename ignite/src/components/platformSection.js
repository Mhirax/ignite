// src/components/PlatformSection.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Game from "./Game";
import "./PlatformSection.scss";

const PlatformSection = () => {
  const { platformPopular, platformUpcoming, platformNew, activePlatform } =
    useSelector((state) => state.games);
  const [expandedSections, setExpandedSections] = useState({
    popular: false,
    upcoming: false,
    new: false,
  });

  const currentPopular = platformPopular[activePlatform];
  const currentUpcoming = platformUpcoming[activePlatform];
  const currentNew = platformNew[activePlatform];

  const platformNames = {
    pc: "PC",
    playstation: "PlayStation",
    xbox: "Xbox",
    nintendo: "Nintendo Switch",
    ios: "iOS",
    android: "Android",
  };

  const getDisplayGames = (games, section) => {
    if (!games) return [];
    return expandedSections[section] ? games : games.slice(0, 4);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const Section = ({ title, icon, data, type }) => {
    if (data?.loading) {
      return (
        <div className="platform-section__loading">
          <div className="platform-section__spinner"></div>
          <p>Loading {title}...</p>
        </div>
      );
    }

    if (data?.error) {
      return (
        <div className="platform-section__error">
          <p>❌ Failed to load {title}</p>
        </div>
      );
    }

    const games = data?.games || [];
    const displayGames = getDisplayGames(games, type);

    return (
      <div className="platform-section__category">
        <div className="platform-section__header">
          <h2 className="platform-section__title">
            <span className="platform-section__title-icon">{icon}</span>
            {title} {platformNames[activePlatform]} Games
          </h2>
          {games.length > 4 && (
            <button
              className="platform-section__view-all"
              onClick={() => toggleSection(type)}
            >
              {expandedSections[type] ? "Show Less ↑" : "View All →"}
            </button>
          )}
        </div>
        <div className="platform-section__grid">
          {displayGames.map((game) => (
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

  return (
    <div className="platform-section">
      <Section title="Popular" icon="🔥" data={currentPopular} type="popular" />
      <Section
        title="Upcoming"
        icon="📅"
        data={currentUpcoming}
        type="upcoming"
      />
      <Section title="New" icon="🆕" data={currentNew} type="new" />
    </div>
  );
};

export default PlatformSection;
