import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import "./Game.scss"; // ← Import SCSS

const Game = ({ name, released, image, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(loadDetail(id));
    document.body.style.overflow = "hidden";
    navigate(`/game/${id}`);
  };

  return (
    <motion.div layoutId={id} onClick={handleClick} className="game-card">
      <motion.img
        layout
        src={
          image || "https://placehold.co/640x360/e0e0e0/aaaaaa?text=No+Image"
        }
        alt={name}
      />
      <motion.h3 layout>{name}</motion.h3>
      <motion.p layout>{released}</motion.p>
    </motion.div>
  );
};

export default Game;
