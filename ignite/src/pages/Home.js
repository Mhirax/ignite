// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Game from "../components/Game";
import PlatformFilter from "../components/platformFilter";
import CategoryFilter from "../components/CategoryFilter";
import GamesFeed from "../components/GamesFeed";
import { gamesURL } from "../api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Home.scss";

// This Home component serves as the main landing page for the gaming website. It features a hero carousel showcasing popular games, a platform filter for users to select their preferred gaming platform, and sections for popular, upcoming, and new games based on the selected platform. Additionally, it displays search results when users search for games, along with loading and error states for the search functionality.
const Home = () => {
  // Redux dispatch and navigation hooks
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  // Accessing search-related state from the Redux store
  const { searched, searchLoading, searchError } = useSelector(
    (state) => state.games,
  );

  // Pull the hero slides from RAWG's top-rated games instead of a hardcoded list
  useEffect(() => {
    let cancelled = false;
    const loadHeroSlides = async () => {
      try {
        const res = await fetch(gamesURL({ ordering: "-rating", pageSize: 5 }));
        if (!res.ok) throw new Error(`RAWG request failed: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        setHeroSlides(
          (data.results || [])
            .filter((game) => game.background_image)
            .map((game) => ({
              id: game.id,
              title: game.name,
              subtitle: [
                game.genres?.map((g) => g.name).slice(0, 2).join(", "),
                game.rating ? `★ ${game.rating.toFixed(1)}` : null,
              ]
                .filter(Boolean)
                .join(" · "),
              backgroundImage: game.background_image,
            })),
        );
      } catch (error) {
        if (!cancelled) setHeroSlides([]);
      }
    };
    loadHeroSlides();
    return () => {
      cancelled = true;
    };
  }, []);

  // Automatically cycle through hero slides every 5 seconds,
  useEffect(() => {
    if (heroSlides.length === 0 || isHovering) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length, isHovering]);

  // Handlers for navigating the hero carousel
  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  // The prevSlide function uses modular arithmetic to wrap around to the last slide when navigating backwards from the first slide, ensuring a seamless carousel experience.
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  // Get the current game details based on the current slide index
  const currentGame = heroSlides[currentSlide];

  return (
    // The Home component's JSX structure includes a hero carousel at the top, which displays featured games with their images, titles, and descriptions. Below the carousel, there is a main container that includes a platform filter for users to select their gaming platform and sections for popular, upcoming, and new games based on the selected platform. If there are search results available, they are displayed in a grid format, along with loading and error messages as needed.
    <div className="home">
      {/* Hero Carousel Section */}
      <div
        className="hero-carousel"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* {/* Display the current hero slide with game details and an "Explore" button that navigates to the game's detail page */}
        {heroSlides.length > 0 && currentGame && (
          <div
            className="hero-slide"
            style={{ backgroundImage: `url(${currentGame.backgroundImage})` }}
          >
            <div className="hero-slide__overlay"></div>
            <div className="hero-slide__content">
              <h1 className="hero-slide__title">{currentGame.title}</h1>
              {currentGame.subtitle && (
                <p className="hero-slide__description">{currentGame.subtitle}</p>
              )}
              <button
                className="hero-slide__button"
                onClick={() => navigate(`/game/${currentGame.id}`)}
              >
                Explore
              </button>
            </div>
          </div>
        )}

        {/* {/* Navigation buttons for the carousel, which are only displayed if there are multiple slides to navigate through. The buttons allow users to manually cycle through the featured games in the hero carousel. */}
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

      {/* Main Container */}
      <div className="home__container">
        {/* Platform Filter */}
        <PlatformFilter />

        {/* Category Filter (All / Popular / New / Upcoming) */}
        <CategoryFilter />

        {/* Games feed, filtered by the selected platform + category, with infinite scroll */}
        <GamesFeed />

        {/* Search Results */}
        {searched.length > 0 && (
          <>
            <div className="section__title">
              <span className="section__title-icon">🔍</span>Search Results
              <span className="result-count">
                {searched.length} games found
              </span>
            </div>
            <div className="games-grid">
              {searched.map((game) => (
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  id={String(game.id)}
                  image={game.background_image}
                />
              ))}
            </div>
          </>
        )}

        {searchLoading && (
          <div className="loading-message">
            <div className="spinner" /> Searching for games...
          </div>
        )}
        {searchError && (
          <div className="error-message">
            ❌ Error searching games. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
