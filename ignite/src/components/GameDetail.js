// src/components/GameDetail.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadDetail } from "../actions/detailAction";
import styled from "styled-components";
import { motion } from "framer-motion";

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

  const exitHandler = () => {
    document.body.style.overflow = "auto";
    navigate("/");
  };

  return (
    <CardShadow
      onClick={exitHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Detail
        layoutId={id}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {!game || !game.id ? (
          <LoadingWrapper>
            <Loading>Loading game details...</Loading>
          </LoadingWrapper>
        ) : (
          <>
            {/* ✅ PLATFORMS IN TOP-RIGHT CORNER */}
            <div className="platforms-corner">
              <h3>PLATFORMS</h3>
              <p className="platforms-list">
                {Array.isArray(game.platforms) && game.platforms.length > 0
                  ? game.platforms
                      .map((data) => data.platform?.name || "Unknown")
                      .join(" / ")
                  : "—"}
              </p>
            </div>

            {/* Title */}
            <motion.h2 layout>{game.name}</motion.h2>

            {/* Rating */}
            <motion.p layout>Rating: {game.rating || "N/A"}</motion.p>

            {/* Main Image */}
            <motion.div layout className="media">
              <img
                src={
                  game.background_image ||
                  "https://placehold.co/800x400/e0e0e0/aaaaaa?text=Cover"
                }
                alt={game.name}
              />
            </motion.div>

            {/* Description */}
            <motion.div layout className="description">
              <p>
                {game.description_raw
                  ? game.description_raw.replace(/\n/g, "<br />")
                  : "No description available."}
              </p>
            </motion.div>

            {/* Screenshots */}
            <motion.div layout className="gallery">
              {screen?.results && screen.results.length > 0 ? (
                screen.results.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={
                      screenshot.image ||
                      "https://placehold.co/200x150/e0e0e0/aaaaaa?text=SS"
                    }
                    alt={`Screenshot ${screenshot.id}`}
                  />
                ))
              ) : (
                <p
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    color: "#777",
                  }}
                >
                  No screenshots available
                </p>
              )}
            </motion.div>
          </>
        )}
      </Detail>
    </CardShadow>
  );
};

// Styled Components
const LoadingWrapper = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const CardShadow = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
  padding: 2rem 0;
`;

const Detail = styled(motion.div)`
  position: relative; /* ✅ Required for absolute positioning */
  width: 80%;
  max-width: 800px;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  min-height: fit-content;

  img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    display: block;
    margin: 1rem 0;
    border-radius: 0.5rem;
  }

  .gallery img {
    max-height: 200px;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .description p {
    line-height: 1.6;
    white-space: pre-wrap;
  }

  h2 {
    margin: 0 0 0.6rem 0;
    font-size: 0.9rem;
    font-weight: 700;
  }

  p {
    margin: 0 0 0.3rem 0;
    font-size: 1rem;
    color: #555;
  }

  /* ✅ TOP-RIGHT PLATFORMS */
  .platforms-corner {
    position: absolute;
    top: 1rem; /* align with padding */
    right: 2rem; /* align with padding */
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    max-width: 270px;
  }

  .platforms-corner h3 {
    margin: 0 0 0.2rem 0;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #777;
    letter-spacing: 1px;
  }

  .platforms-list {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default GameDetail;
