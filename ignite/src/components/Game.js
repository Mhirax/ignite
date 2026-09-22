import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { smallImage } from "../util";
import "./Game.scss"; // ← Import SCSS

const Game = ({ name, released, image, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    dispatch(loadDetail(id));
    document.body.style.overflow = "hidden";
    navigate(`/game/${id}`);
  };

  return (
    <motion.div layoutId={id} onClick={handleClick} className="game-card">
      <div className="game-card__image-wrapper">
        {!loaded && <div className="game-card__skeleton" />}
        <motion.img
          layout
          className={`game-card__image ${loaded ? "game-card__image--loaded" : ""}`}
          src={smallImage(image, 640)}
          alt={name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <motion.h3 layout>{name}</motion.h3>
      <motion.p layout>{released}</motion.p>
    </motion.div>
  );
};

export default Game;
