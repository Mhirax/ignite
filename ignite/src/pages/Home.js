// src/pages/Home.js
import React, { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
// Components
import Game from "../components/Game";
// Styling
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  
  const { popular, newGames, upcoming } = useSelector((state) => state.games);

  return (
    <GameList>       
      <h1>Upcoming Games</h1>
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
        

      <h1>Popular Games</h1>
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

      <h1>New Games</h1>
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

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h1 {
    margin: 2rem 0;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
  margin-top: 2rem;
`;

export default Home;
