import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion"; // ✅ keep this
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";


// src/components/Game.js - CORRECT ORDER
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
      {/* ✅ Image FIRST */}
      <motion.img
        layout
        src={
          image || "https://placehold.co/640x360/e0e0e0/aaaaaa?text=No+Image"
        }
        alt={name}
      />
      {/* ✅ Title SECOND */}
      <motion.h3 layout>{name}</motion.h3>
      {/* ✅ Date THIRD */}
      <motion.p layout>{released}</motion.p>
    </StyledGame>
  );
};

// const StyledGame = styled(motion.div)`
//   min-height: 250px;
//   box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
//   text-align: center;
//   border-radius: 1rem;
//   cursor: pointer;
//   overflow: hidden;  /* ✅ ADD THIS - keeps corners rounded */
//   display: flex;
//   flex-direction: column;  /* ✅ ADD THIS - stacks elements vertically */
  
//   img {
//     width: 100%;
//     height: 200px;
//     object-fit: cover;
//   }
  
//   h3 {
//     margin: 1rem 0 0.5rem 0;  /* ✅ ADD THIS - space above title */
//     padding: 0 1rem;
//   }
  
//   p {
//     margin: 0 0 1rem 0;  /* ✅ ADD THIS - space below date */
//     padding: 0 1rem;
//     color: #666;
//   }
// `;

export default Game;