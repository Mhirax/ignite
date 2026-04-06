// src/components/GameCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import "./GameCard.scss";

const GameCard = ({ id, title, image, accentColor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(loadDetail(id));
    document.body.style.overflow = "hidden";
    navigate(`/game/${id}`);
  };

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="game-card__image-wrapper">
        <img
          src={image || "https://placehold.co/300x200/1a1a1a/666?text=No+Image"}
          alt={title}
          className="game-card__image"
        />
        <div
          className="game-card__overlay"
          style={{
            background: `linear-gradient(to top, ${accentColor} 0%, transparent 100%)`,
          }}
        ></div>
      </div>
      <h3 className="game-card__title">{title}</h3>
    </div>
  );
};

export default GameCard;
