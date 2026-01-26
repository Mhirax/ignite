import React, { useEffect } from "react";
//Redux
import { useDispatch,useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
//components
import Game from '../components/Game';
//Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';


const Home = () => {
  // FETCH GAMES
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
    //Get the data back
    const { popular, newGames, upcoming} = useSelector((state) => state.games);
  
  return (
    <GameList>
          <h1>Upcoming Games</h1>
          <Games>
              {upcoming.map((game) => (<Game
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                  key={game.id}
              />
              ))}
          </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`   

`
const Games = styled(motion.div)`
`

export default Home;
