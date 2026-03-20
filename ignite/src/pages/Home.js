// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const [featuredGame, setFeaturedGame] = useState(null);

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const { popular, newGames, upcoming, searched, searchLoading, searchError } =
    useSelector((state) => state.games);

  // Set featured game when popular games load
  useEffect(() => {
    if (popular && popular.length > 0) {
      setFeaturedGame(popular[0]);
    }
  }, [popular]);

  return (
    <HomeContainer>
      {/* 🎯 HERO BANNER - WITH BACKGROUND GAME IMAGE */}
      {featuredGame && (
        <HeroBanner
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          bgImage={featuredGame.background_image}
        >
          <HeroOverlay />
          <HeroContent>
            <HeroBadge> FEATURED GAME</HeroBadge>
            <HeroTitle>{featuredGame.name}</HeroTitle>
            <HeroDescription>
              {featuredGame.description_raw?.slice(0, 120)}...
            </HeroDescription>
            <HeroStats>
              <StatChip>⭐ {featuredGame.rating}</StatChip>
              <StatChip>📅 {featuredGame.released?.slice(0, 4)}</StatChip>
              <StatChip>
                🎮{" "}
                {featuredGame.platforms
                  ?.slice(0, 3)
                  .map((p) => p.platform.name)
                  .join(", ")}
              </StatChip>
            </HeroStats>
            <HeroButtons>
              <PrimaryButton
                onClick={() =>
                  window.open(`/game/${featuredGame.id}`, "_blank")
                }
              >
                Play Now 
              </PrimaryButton>
              <SecondaryButton
                onClick={() =>
                  document
                    .getElementById("popular")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore More ↓
              </SecondaryButton>
            </HeroButtons>
          </HeroContent>
        </HeroBanner>
      )}

      {/* Stats Bar */}
      <StatsBar>
        <StatItem>
          <StatNumber>10,000+</StatNumber>
          <StatLabel>Games Available</StatLabel>
        </StatItem>
        <StatDivider>|</StatDivider>
        <StatItem>
          <StatNumber>50+</StatNumber>
          <StatLabel>Platforms</StatLabel>
        </StatItem>
        <StatDivider>|</StatDivider>
        <StatItem>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Live Updates</StatLabel>
        </StatItem>
      </StatsBar>

      {/* SEARCH RESULTS */}
      {searched.length > 0 && (
        <>
          <SectionTitle>
            <TitleIcon>🔍</TitleIcon>
            Search Results
            <ResultCount>{searched.length} games found</ResultCount>
          </SectionTitle>
          <Games>
            {searched.map((game) => (
              <Game
                name={game.name}
                released={game.released}
                id={String(game.id)}
                image={game.background_image}
                key={game.id}
              />
            ))}
          </Games>
        </>
      )}

      {searchLoading && (
        <LoadingMessage>
          <Spinner /> Searching for games...
        </LoadingMessage>
      )}

      {searchError && (
        <ErrorMessage>❌ Error searching games. Please try again.</ErrorMessage>
      )}

      {/* UPCOMING GAMES */}
      <Section id="upcoming">
        <SectionTitle>
        
          Upcoming Games
        </SectionTitle>
        <Games>
          {upcoming.slice(0, 4).map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={String(game.id)}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <ViewAllLink href="#upcoming">View All Upcoming →</ViewAllLink>
      </Section>

      {/* POPULAR GAMES */}
      <Section id="popular">
        <SectionTitle>
          Popular Games
        </SectionTitle>
        <Games>
          {popular.slice(0, 4).map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={String(game.id)}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <ViewAllLink href="#popular">View All Popular →</ViewAllLink>
      </Section>

      {/* NEW GAMES */}
      <Section id="new">
        <SectionTitle>
          New Games
        </SectionTitle>
        <Games>
          {newGames.slice(0, 4).map((game) => (
            <Game
              name={game.name}
              released={game.released}
              id={String(game.id)}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <ViewAllLink href="#new">View All New Releases →</ViewAllLink>
      </Section>
    </HomeContainer>
  );
};

// ========== STYLED COMPONENTS ==========

const HomeContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

// 🎯 HERO BANNER WITH BACKGROUND IMAGE
const HeroBanner = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 1.5rem;
  margin: 1rem 0 2rem;
  overflow: hidden;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center 30%;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  color: white;
  max-width: 60%;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 2rem;
    text-align: center;
  }
`;

const HeroBadge = styled.span`
  display: inline-block;
  background: rgba(255, 118, 118, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  width: fit-content;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin: 0 auto 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.2;

  &:after {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatChip = styled.span`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: #ff7676;
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff5f5f;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.8rem 1.8rem;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

// Stats Bar
const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  margin: 2rem 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff7676;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const StatDivider = styled.span`
  color: #ddd;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Section Styles
const Section = styled.section`
  scroll-margin-top: 100px;
  margin-bottom: 2rem;
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  color: #ff7676;
  margin: 2.5rem 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: #ff7676;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const TitleIcon = styled.span`
  font-size: 1.5rem;
`;

const ResultCount = styled.span`
  font-size: 0.9rem;
  background: #ff7676;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-weight: normal;
`;

const Games = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 1rem;
`;

const ViewAllLink = styled.a`
  display: inline-block;
  color: #ff7676;
  font-weight: 500;
  margin-top: 0.5rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #ff7676;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #ffeeee;
  color: #ff3333;
  border-radius: 8px;
  margin: 2rem 0;
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #ff7676;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Home;
