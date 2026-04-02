// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import { motion } from "framer-motion";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [featuredGame, setFeaturedGame] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    upcoming: false,
    popular: false,
    new: false,
  });

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const { popular, newGames, upcoming, searched, searchLoading, searchError } =
    useSelector((state) => state.games);

  useEffect(() => {
    if (popular && popular.length > 0) {
      setFeaturedGame(popular[0]);
    }
  }, [popular]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getDisplayGames = (games, section) => {
    if (!games) return [];
    return expandedSections[section] ? games : games.slice(0, 4);
  };

  return (
    <div className="home">
      {/* Hero Banner - Full Width */}
      {featuredGame && (
        <motion.div
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundImage: `url(${featuredGame.background_image})` }}
        >
          <div className="hero__overlay" />
          <div className="hero__content">
            {/* <span className="hero__badge">🔥 FEATURED GAME</span> */}
            <h1 className="hero__title">{featuredGame.name}</h1>
            <h3>hhh</h3>
            <div className="hero__stats">
             
              <span className="hero__stat">
                <strong>📅 {featuredGame.released?.slice(0, 4)}</strong> Release
              </span>
              <span className="hero__stat">
                <strong> {featuredGame.platforms?.length || 0}</strong>{" "}
                Platforms
              </span>
            </div>
            <div className="hero__buttons">
              <button
                className="hero__btn-primary"
                onClick={() => navigate(`/game/${featuredGame.id}`)}
              >
                Play Now 
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rest of content inside container */}
      <div className="home__container">
   

        {/* SEARCH RESULTS SECTION */}
        {searched.length > 0 && (
          <>
            <div className="section__title">
              <span className="section__title-icon">🔍</span>
              Search Results
              <span className="result-count">
                {searched.length} games found
              </span>
            </div>
            <div className="games-grid">
              {searched.map((game) => (
                <Game
                  name={game.name}
                  released={game.released}
                  id={String(game.id)}
                  image={game.background_image}
                  key={game.id}
                />
              ))}
            </div>
          </>
        )}

        {/* SEARCH LOADING */}
        {searchLoading && (
          <div className="loading-message">
            <div className="spinner" /> Searching for games...
          </div>
        )}

        {/* SEARCH ERROR */}
        {searchError && (
          <div className="error-message">
            ❌ Error searching games. Please try again.
          </div>
        )}

        {/* UPCOMING GAMES SECTION */}
        <section id="upcoming" className="section">
          <div className="section__header">
            <h2 className="section__title">
              <span className="section__title-icon">📅</span>
              Upcoming Games
            </h2>
            <button
              className="section__view-all"
              onClick={() => toggleSection("upcoming")}
            >
              {expandedSections.upcoming ? "Show Less ↑" : "View All →"}
            </button>
          </div>
          <div className="games-grid">
            {getDisplayGames(upcoming, "upcoming").map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={String(game.id)}
                image={game.background_image}
                key={game.id}
              />
            ))}
          </div>
        </section>

        {/* POPULAR GAMES SECTION */}
        <section id="popular" className="section">
          <div className="section__header">
            <h2 className="section__title">
              <span className="section__title-icon">🔥</span>
              Popular Games
            </h2>
            <button
              className="section__view-all"
              onClick={() => toggleSection("popular")}
            >
              {expandedSections.popular ? "Show Less ↑" : "View All →"}
            </button>
          </div>
          <div className="games-grid">
            {getDisplayGames(popular, "popular").map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={String(game.id)}
                image={game.background_image}
                key={game.id}
              />
            ))}
          </div>
        </section>

        {/* NEW GAMES SECTION */}
        <section id="new" className="section">
          <div className="section__header">
            <h2 className="section__title">
              <span className="section__title-icon">🆕</span>
              New Games
            </h2>
            <button
              className="section__view-all"
              onClick={() => toggleSection("new")}
            >
              {expandedSections.new ? "Show Less ↑" : "View All →"}
            </button>
          </div>
          <div className="games-grid">
            {getDisplayGames(newGames, "new").map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={String(game.id)}
                image={game.background_image}
                key={game.id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
