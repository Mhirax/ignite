// src/components/GamesFeed.jsx
import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setActivePlatform, setActiveCategory } from "../actions/gamesAction";
import { CATEGORIES } from "../api";
import Game from "./Game";
import "./GamesFeed.scss";

const GamesFeed = () => {
  const dispatch = useDispatch();
  const { games, page, hasMore, loading, error, activePlatform, activeCategory } = useSelector(
    (state) => state.games,
  );
  const sentinelRef = useRef(null);
  const isEmpty = !loading && !error && games.length === 0;

  const resetFilters = () => {
    dispatch(setActivePlatform("all"));
    dispatch(setActiveCategory("all"));
  };

  // Initial load and reload whenever the platform or category filter changes
  useEffect(() => {
    dispatch(fetchGames({ platform: activePlatform, category: activeCategory, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlatform, activeCategory]);

  const loadNextPage = useCallback(() => {
    if (loading || !hasMore) return;
    dispatch(fetchGames({ platform: activePlatform, category: activeCategory, page: page + 1 }));
  }, [dispatch, loading, hasMore, activePlatform, activeCategory, page]);

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
      <div className="section__title">
        {activeCategory === "all" ? "All Games" : `${CATEGORIES[activeCategory].label} Games`}
      </div>

      {!isEmpty && (
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
      )}

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

      {isEmpty && (
        <div className="empty-state">
          <p>No games found for this filter combination.</p>
          <button className="retry-btn" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}

      {!loading && !error && hasMore && <div ref={sentinelRef} className="games-feed__sentinel" />}
    </div>
  );
};

export default GamesFeed;
