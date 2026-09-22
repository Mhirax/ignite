import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadDetail } from "../actions/detailAction";
import { motion } from "framer-motion";
import { smallImage } from "../util";
import "./GameDetails.scss"; // ← Import SCSS

import playstation from "../img/playstation.png";
import Xbox from "../img/xbox.png";
import steam from "../img/steam.png";
import gamepad from "../img/gamepad.svg";

const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { screen, game, isLoading, error } = useSelector((state) => state.detail);

  // The store may still hold the previously opened game while this one loads
  const isCurrentGame = game?.id === parseInt(id, 10);

  // Fetch once per id. Card clicks no longer dispatch too, so there's no double request.
  useEffect(() => {
    if (id && !isCurrentGame) {
      dispatch(loadDetail(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  // Lock page scroll while the modal is open, and ALWAYS unlock when it closes,
  // including when the user leaves with the browser Back button
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const getPlatformIcon = (platformName) => {
    const name = (platformName || "").toLowerCase();
    if (name.includes("playstation")) return playstation;
    if (name.includes("xbox")) return Xbox;
    if (name.includes("pc") || name.includes("windows")) return steam;
    return gamepad;
  };

  const exitHandler = () => {
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
        {error ? (
          <div className="game-detail__loading">
            <p>❌ Couldn't load this game. Please try again.</p>
          </div>
        ) : isLoading || !isCurrentGame ? (
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
              src={smallImage(game.background_image, 1280)}
              alt={game.name}
            />

            <div className="game-detail__description">
              {/* Line breaks are shown with CSS white-space: pre-line (React would print "<br />" as text) */}
              <p>{game.description_raw || "No description available."}</p>
            </div>

            {screen?.results && screen.results.length > 0 && (
              <>
                <h3 className="game-detail__screenshots-title">Screenshots</h3>
                <div className="game-detail__screenshots">
                  {screen.results.map((screenshot) => (
                    <img
                      key={screenshot.id}
                      className="game-detail__screenshot"
                      src={smallImage(screenshot.image, 640)}
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
