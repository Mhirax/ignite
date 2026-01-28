import React from "react";

//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

//Redux
import { useSelector } from "react-redux";

const GameDetail = () => {
  //Data
  const { screen, game } = useSelector((state) => state.detail);

  return (
    <CardShadow className="card-shadow">
      <div className="detail">
        <div className="stats">
          <div className="rating">
            <h3>{game.name}</h3>
            <p>Rating: {game.rating}</p>
          </div>
          <div className="info">
            <h3>Platforms</h3>
            <div className="platforms">
              {/* 🔒 SAFETY CHECK: Only map if platforms exists */}
              {game.platforms &&
                game.platforms.map((data) => (
                  <h3 key={data.platform.id}>{data.platform.name}</h3>
                ))}
            </div>
          </div>
        </div>
        <div className="media">
          <img src={game.background_image} alt="image" />
        </div>
        <div className="description">
          <p>{game.description_raw}</p>
        </div>
        <div className="gallery">
          {/* 🔒 SAFETY CHECK: Only map if screen.results exists */}
          {screen.results &&
            screen.results.map((screen) => (
              <img src={screen.image} key={screen.id} alt="game" />
            ))}
        </div>
      </div>
    </CardShadow>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: #f5f5f5; /* added a color so it's visible */
  pos
`;

export default GameDetail;
