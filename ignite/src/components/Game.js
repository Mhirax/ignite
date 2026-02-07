// Game.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
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

  // 🔍 Debug (optional): uncomment to verify
  // console.log("Image:", image, "→ Resized:", smallImage(image, 640));

  return (
    <StyledGame layoutId={id} onClick={handleClick}>
      <h3>{name}</h3>
      <p>{released}</p>
      <img src={image || "https://placehold.co/640x360/e0e0e0/aaaaaa?text=No+Image"} alt={name} />
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
    max-width: 100%;
    max-height: 200px; /* for cards */
    object-fit: cover;
    display: block;
  }
`;

export default Game;