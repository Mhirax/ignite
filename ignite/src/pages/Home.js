// pages/Home.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  // Get all games including search results
  const { popular, newGames, upcoming, searched, searchLoading, searchError } =
    useSelector((state) => state.games);

  return (
    <GameList>
      {/* 🔍 SEARCH RESULTS SECTION - Shows when there are search results */}
      {searched.length > 0 && (
        <>
          <SectionTitle>
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

      {/* 🔍 LOADING STATE FOR SEARCH */}
      {searchLoading && (
        <LoadingMessage>
          <Spinner /> Searching for games...
        </LoadingMessage>
      )}

      {/* 🔍 ERROR STATE FOR SEARCH */}
      {searchError && (
        <ErrorMessage>❌ Error searching games. Please try again.</ErrorMessage>
      )}

      {/* UPCOMING GAMES SECTION */}
      <SectionTitle>Upcoming Games</SectionTitle>
      <Games>
        {upcoming.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={String(game.id)}
            image={game.background_image}
            key={game.id}
          />
        ))}
      </Games>

      {/* POPULAR GAMES SECTION */}
      <SectionTitle>Popular Games</SectionTitle>
      <Games>
        {popular.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={String(game.id)}
            image={game.background_image}
            key={game.id}
          />
        ))}
      </Games>

      {/* NEW GAMES SECTION */}
      <SectionTitle>New Games</SectionTitle>
      <Games>
        {newGames.map((game) => (
          <Game
            name={game.name}
            released={game.released}
            id={String(game.id)}
            image={game.background_image}
            key={game.id}
          />
        ))}
      </Games>
    </GameList>
  );
};

// Styled Components
const GameList = styled(motion.div)`
  padding: 2rem 5rem;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-family: "Abril Fatface", cursive;
  font-weight: lighter;
  color: #ff7676;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ResultCount = styled.span`
  font-size: 1rem;
  background: #ff7676;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0;
  margin-top: 1rem;
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
