// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Game from "../components/Game";
import PlatformFilter from "../components/platformFilter";
import PlatformSection from "../components/platformSection";
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

  // Manually defining hero slides with popular games and their details
  useEffect(() => {
    const manualHeroSlides = [
      {
        id: 3498,
        title: "Grand Theft Auto V",
        description:
          "Los Santos - a sprawling sun-soaked metropolis full of self-help gurus, starlets and fading celebrities. Enter a world of crime and chaos.",
        backgroundImage: "https://images7.alphacoders.com/439/439636.jpg",
      },
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

        {/* Platform Sections (Popular, Upcoming, New for selected platform) */}
        <PlatformSection />

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
