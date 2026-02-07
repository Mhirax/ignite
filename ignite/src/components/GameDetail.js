// src/components/GameDetail.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadDetail } from "../actions/detailAction";
import styled from "styled-components";
import { motion } from "framer-motion";
import { smallImage } from "../util";

const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const exitDetailHandler = (e) => {
    if (e.target.classList.contains("shadow") || e.target === e.currentTarget) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };

  const { screen, game } = useSelector((state) => state.detail);

  useEffect(() => {
    if (id && (!game || game.id !== parseInt(id))) {
      dispatch(loadDetail(id));
    }
  }, [id, , dispatch]);

  if (!game || !game.id) {
    return <Loading>Loading game details...</Loading>;
  }

  const description = game.description_raw || "No description available.";

  return (
    <CardShadow className="shadow" onClick={exitDetailHandler}>
      <Detail>
        <div className="stats">
          <div className="rating">
            <h3>{game.name}</h3>
            <p>Rating: {game.rating}</p>
          </div>
          <div className="info">
            <h3>Platforms</h3>
            <div className="platforms">
              {game.platforms &&
                game.platforms.map((data) => (
                  <h3 key={data.platform.id}>{data.platform.name}</h3>
                ))}
            </div>
          </div>
        </div>
        <div className="media">
          <img
            src={
              game.background_image ||
              "https://placehold.co/800x400/e0e0e0/aaaaaa?text=No+Cover"
            }
            alt={game.name}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x400/e0e0e0/aaaaaa?text=Image+Unavailable";
            }}
          />
        </div>
        <div className="description">
          <p
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br />"),
            }}
          />
        </div>
        <div className="gallery">
          {screen.results && screen.results.length > 0 ? (
            screen.results.map((screenshot) => (
              <img
                key={screenshot.id}
                src={
                  screenshot.image ||
                  "https://placehold.co/200x150/e0e0e0/aaaaaa?text=SS"
                }
                alt={`Screenshot ${screenshot.id}`}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/200x150/e0e0e0/aaaaaa?text=Fail";
                }}
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
        </div>
      </Detail>
    </CardShadow>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  font-size: 1.2rem;
  color: #333;
`;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 10;
`;

const Detail = styled(motion.div)`
  width: 80%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  color: black;

  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 400px;
    object-fit: cover;
    display: block;
    margin: 0.5rem 0;
  }

  .description p {
    line-height: 1.6;
    font-size: 1rem;
    color: #333;
    margin: 1.5rem 0;
    white-space: pre-wrap;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export default GameDetail;
