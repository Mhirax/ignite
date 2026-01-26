import React from 'react';
//Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Game = ({ name, released, image }) => {
    return (
        <StyledGame>
          <h3>{name}</h3>
          <p>{released}</p>
          <img src={image} alt={name} />
        </StyledGame>
    );
};

const StyledGame = styled(motion.div)`img {
    width: 100%;
};`

export default Game;