import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadDetail } from "../actions/detailAction";
import { motion } from "framer-motion";
import "./GameDetails.scss"; // ← Import SCSS

import playstation from "../img/playstation.png";
import Xbox from "../img/xbox.png";
import steam from "../img/steam.png";
import gamepad from "../img/gamepad.svg";

const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { screen, game } = useSelector((state) => state.detail);

  useEffect(() => {
    if (id && (!game || game.id !== parseInt(id))) {
      dispatch(loadDetail(id));
    }
  }, [id, game, dispatch]);

  const getPlatformIcon = (platformName) => {
    const name = (platformName || "").toLowerCase();
    if (name.includes("playstation")) return playstation;
    if (name.includes("xbox")) return Xbox;
    if (name.includes("pc") || name.includes("windows")) return steam;
    return gamepad;
  };

  const exitHandler = () => {
    document.body.style.overflow = "auto";
    navigate("/");
  };

  return (
    <motion.div
      className="game-detail__overlay"
      onClick={exitHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="game-detail__close" onClick={exitHandler}>
        ✕ Close
      </button>

      <motion.div
        className="game-detail__card"
        layoutId={id}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!game || !game.id ? (
          <div className="game-detail__loading">
            <p>Loading game details...</p>
          </div>
        ) : (
          <>
            <div className="game-detail__platforms">
              <h3>PLATFORMS</h3>
              <div className="game-detail__platform-icons">
                {Array.isArray(game.platforms) && game.platforms.length > 0 ? (
                  game.platforms.map((data, i) => {
                    const platformName = data.platform?.name || "Unknown";
                    const icon = getPlatformIcon(platformName);
                    return (
                      <img
                        key={i}
                        src={icon}
                        alt={platformName}
                        className="game-detail__platform-icon"
                      />
                    );
                  })
                ) : (
                  <img
                    src={gamepad}
                    alt="Unknown"
                    className="game-detail__platform-icon"
                  />
                )}
              </div>
            </div>

            <h2 className="game-detail__title">{game.name}</h2>
            <p className="game-detail__rating">
              Rating: {game.rating || "N/A"}
            </p>

            <img
              className="game-detail__image"
              src={
                game.background_image ||
                "https://placehold.co/800x400/e0e0e0/aaaaaa?text=Cover"
              }
              alt={game.name}
            />

            <div className="game-detail__description">
              <p>
                {game.description_raw
                  ? game.description_raw.replace(/\n/g, "<br />")
                  : "No description available."}
              </p>
            </div>

            {screen?.results && screen.results.length > 0 && (
              <>
                <h3 className="game-detail__screenshots-title">Screenshots</h3>
                <div className="game-detail__screenshots">
                  {screen.results.map((screenshot) => (
                    <img
                      key={screenshot.id}
                      className="game-detail__screenshot"
                      src={
                        screenshot.image ||
                        "https://placehold.co/200x150/e0e0e0/aaaaaa?text=SS"
                      }
                      alt={`Screenshot ${screenshot.id}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GameDetail;
