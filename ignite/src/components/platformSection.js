// src/components/PlatformSection.jsx
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import GameCard from "./GameCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./platformSection.scss";

const PlatformSection = () => {
  const { platformPopular, platformUpcoming, platformNew, activePlatform } =
    useSelector((state) => state.games);
  const [expandedSections, setExpandedSections] = useState({
    popular: false,
    upcoming: false,
    new: false,
  });

  const scrollContainers = {
    popular: useRef(null),
    upcoming: useRef(null),
    new: useRef(null),
  };

  const currentPopular = platformPopular[activePlatform];
  const currentUpcoming = platformUpcoming[activePlatform];
  const currentNew = platformNew[activePlatform];



  const getDisplayGames = (games, section) => {
    if (!games || !games.games) return [];
    return expandedSections[section] ? games.games : games.games.slice(0, 8);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const scroll = (direction, section) => {
    const container = scrollContainers[section].current;
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const Section = ({ title, icon, data, type, accentColor }) => {
    if (data?.loading) {
      return (
        <div className="platform-section__category">
          <div className="platform-section__header">
            <div className="platform-section__title-wrapper">
              <span className="platform-section__title-icon">{icon}</span>
              {<h2 className="platform-section__title">
                {title} GAMES
              </h2>}
            </div>
          </div>
          <div className="platform-section__loading">
            <div className="platform-section__spinner"></div>
          </div>
        </div>
      );
    }

    if (data?.error) {
      return (
        <div className="platform-section__category">
          <div className="platform-section__header">
            <div className="platform-section__title-wrapper">
              <span className="platform-section__title-icon">{icon}</span>
              { <h2 className="platform-section__title">
                {title}
              </h2> }
            </div>
          </div>
          <div className="platform-section__error">
            <p>❌ Failed to load {title.toLowerCase()} games</p>
          </div>
        </div>
      );
    }

    const games = data?.games || [];
    const displayGames = getDisplayGames(data, type);
    const showArrows = displayGames.length > 4;

    return (
      <div className="platform-section__category">
        <div className="platform-section__header">
          <div
            className="platform-section__title-wrapper"
            style={{ borderLeftColor: accentColor }}
          >
            <span className="platform-section__title-icon">{icon}</span>
            <h2 className="platform-section__title">
              {title} 
            </h2>
          </div>
          {games.length > 8 && (
            <button
              className="platform-section__view-all"
              onClick={() => toggleSection(type)}
            >
              {expandedSections[type] ? "Show Less ↑" : "View All →"}
            </button>
          )}
        </div>

        <div className="platform-section__carousel-wrapper">
          {showArrows && (
            <button
              className="platform-section__arrow platform-section__arrow--left"
              onClick={() => scroll("left", type)}
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
          )}

          <div
            className="platform-section__carousel"
            ref={scrollContainers[type]}
          >
            {displayGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.name}
                image={game.background_image}
                accentColor={accentColor}
              />
            ))}
          </div>

          {showArrows && (
            <button
              className="platform-section__arrow platform-section__arrow--right"
              onClick={() => scroll("right", type)}
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="platform-section">
      <Section
        title="POPULAR"
        data={currentPopular}
        type="popular"
       
      />
      <Section
        title="UPCOMING"
        data={currentUpcoming}
        type="upcoming"
       
      />
      <Section
        title="NEW GAMES"
      
        data={currentNew}
        type="new"
        
      />
    </div>
  );
};

export default PlatformSection;
