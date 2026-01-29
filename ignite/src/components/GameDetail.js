// src/components/GameDetail.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadDetail } from "../actions/detailAction";
import styled from "styled-components";
import { motion } from "framer-motion";

const GameDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { screen, game,isLoading } = useSelector((state) => state.detail);

  useEffect(() => {
    if (id && (!game || game.id !== parseInt(id))) {
      dispatch(loadDetail(id));
    }
  }, [id, game, dispatch]); // ✅ All dependencies included

  if (!game || !game.id) {
    return <Loading>Loading game details...</Loading>;
  }

  const description = game.description_raw || "No description available.";

  return (
    <>
      {!isLoading && (
        <CardShadow>
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
              <img src={game.background_image} alt={game.name} />
            </div>
            <div className="description">
              <p
                dangerouslySetInnerHTML={{
                  __html: description.replace(/\n/g, "<br />"),
                }}
              />
            </div>
            <div className="gallery">
              {screen.results &&
                screen.results.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt="Screenshot"
                  />
                ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
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
    border-radius: 0.5rem;
    margin: 1rem 0;
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
