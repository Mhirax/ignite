// src/components/GamesFeed.jsx
import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../actions/gamesAction";
import Game from "./Game";
import "./GamesFeed.scss";

const GamesFeed = () => {
  const dispatch = useDispatch();
  const { games, page, hasMore, loading, error, activePlatform } = useSelector(
    (state) => state.games,
  );
  const sentinelRef = useRef(null);

  // Initial load and reload whenever the platform filter changes
  useEffect(() => {
    dispatch(fetchGames({ platform: activePlatform, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlatform]);

  const loadNextPage = useCallback(() => {
    if (loading || !hasMore) return;
    dispatch(fetchGames({ platform: activePlatform, page: page + 1 }));
  }, [dispatch, loading, hasMore, activePlatform, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadNextPage();
      },
      { rootMargin: "400px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadNextPage]);

  return (
    <div className="games-feed">
      <div className="section__title">All Games</div>

      <div className="games-grid">
        {games.map((game) => (
          <Game
            key={game.id}
            name={game.name}
            released={game.released}
            id={String(game.id)}
            image={game.background_image}
          />
        ))}
      </div>

      {loading && (
        <div className="loading-message">
          <div className="spinner" /> Loading games...
        </div>
      )}

      {error && !loading && (
        <div className="error-message">
          ❌ Error loading games.{" "}
          <button className="retry-btn" onClick={loadNextPage}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && hasMore && <div ref={sentinelRef} className="games-feed__sentinel" />}
    </div>
  );
};

export default GamesFeed;
