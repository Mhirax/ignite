// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlatformFilter from "../components/platformFilter"; // 👈 NEW
import PlatformGames from "../components/platformGames"; // 👈 NEW
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
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
    // 👇 EDIT YOUR HERO GAMES HERE - Add/Remove/Modify as you want
    const manualHeroSlides = [
      {
        id: 3498,
        title: "Grand Theft Auto V",
        description:
          "Los Santos - a sprawling sun-soaked metropolis full of self-help gurus, starlets and fading celebrities. Enter a world of crime and chaos.",
        backgroundImage: "https://images7.alphacoders.com/439/439636.jpg",
      },
      // {
      //   id: 3328,
      //   title: "The Witcher 3: Wild Hunt",
      //   description:
      //     "You are Geralt of Rivia, a monster hunter for hire. The world is at war, and monsters roam free in this dark fantasy epic.",
      //   backgroundImage:
      //     "http://hdqwalls.com/wallpapers/the-witcher-3-wild-hunt-4.jpg",
      // },
      {
        id: 28,
        title: "Red Dead Redemption 2",
        description:
          "America, 1899. The end of the Wild West era has begun. After a robbery goes wrong, Arthur Morgan must choose between his own ideals and loyalty to the gang.",
        backgroundImage:
          "https://wallpapers.com/images/hd/red-dead-redemption-2-full-hd-89a419dquungxzai.jpg",
      },
      {
        id: 5679,
        title: "Elden Ring",
        description:
          "The critically acclaimed action RPG from Hidetaka Miyazaki and George R.R. Martin. Explore the Lands Between and become the Elden Lord.",
        backgroundImage:
          "https://wallpapers.com/images/hd/elden-ring-game-scenery-u6f65ngdqukwsshd.jpg",
      },
      {
        id: 41494,
        title: "Cyberpunk 2077",
        description:
          "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
        backgroundImage:
          "https://images.hdqwalls.com/wallpapers/cyberpunk-2077-phantom-liberty-game-2025-b7.jpg",
      },
    ];

    setHeroSlides(manualHeroSlides);
  }, []); // Empty dependency array - runs only once when page loads

  // Auto-play functionality
  useEffect(() => {
    if (heroSlides.length === 0 || isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length, isHovering]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

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

  const currentGame = heroSlides[currentSlide];

  return (
    <div className="home">
      {/* Hero Carousel Section */}
      <div
        className="hero-carousel"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {heroSlides.length > 0 && currentGame && (
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${currentGame.backgroundImage})` }}
          >
            <div className="hero-slide__overlay"></div>
            <div className="hero-slide__content">
              <h1 className="hero-slide__title">{currentGame.title}</h1>

              <p className="hero-slide__description">
                {currentGame.description}
              </p>
              <button
                className="hero-slide__button"
                onClick={() => navigate(`/game/${currentGame.id}`)}
              >
                Explore
              </button>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {heroSlides.length > 1 && (
          <>
            <button className="hero-carousel__prev" onClick={prevSlide}>
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button className="hero-carousel__next" onClick={nextSlide}>
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {heroSlides.length > 1 && (
          <div className="hero-carousel__dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-carousel__dot ${currentSlide === index ? "hero-carousel__dot--active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Container for all content */}
      <div className="home__container">
        {/* ============================================ */}
        {/* 🎮 NEW: PLATFORM SECTION - ADDED HERE */}
        {/* ============================================ */}
        <PlatformFilter />
        <PlatformGames />

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
