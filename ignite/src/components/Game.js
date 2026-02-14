// src/components/Game.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion"; // ✅ keep this
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";

const Game = ({ name, released, image, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(loadDetail(id));
    document.body.style.overflow = "hidden";
    navigate(`/game/${id}`);
  };

  return (
    <StyledGame layoutId={id} onClick={handleClick}>
      {/* ✅ Safe: use motion.h3 only if motion is imported (it is) */}
      <motion.h3 layout>{name}</motion.h3>
      <motion.p layout>{released}</motion.p>
      <motion.img
        layout
        src={
          image || "https://placehold.co/640x360/e0e0e0/aaaaaa?text=No+Image"
        }
        alt={name}
      />
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 250px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }
`;

export default Game;
