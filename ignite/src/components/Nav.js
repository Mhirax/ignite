// components/Nav.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGames } from "../actions/gamesAction";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔍 Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Don't search if input is empty
    if (searchInput.trim() === "") {
      alert("Please enter a game name");
      return;
    }

    // Dispatch search action
    dispatch(searchGames(searchInput));

    // Navigate to home to see results
    navigate("/");

    // Clear input
    setSearchInput("");
  };

  // 🔍 Handle logo click - go home and clear search
  const handleLogoClick = () => {
    navigate("/");
    // Optional: Clear search results when going home
    // dispatch({ type: "CLEAR_SEARCH" });
  };

  return (
    <StyledNav>
      <Logo onClick={handleLogoClick}>
        <h2>IGNITE/FLARE🔥</h2>
      </Logo>

      {/* 🔍 Search form - now with onSubmit */}
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search games..."
        />
        <button type="submit">Search</button>
      </form>
    </StyledNav>
  );
};

// Styled components
const StyledNav = styled(motion.nav)`
  padding: 1rem 5rem;
  background: #ff7676;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
  }

  .search {
    display: flex;
    gap: 0.5rem;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  input {
    width: 300px;
    font-size: 1rem;
    border: none;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    font-weight: 500;

    @media (max-width: 768px) {
      width: 100%;
    }

    &:focus {
      outline: 2px solid #333;
    }
  }

  button {
    font-size: 1rem;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    background: #333;
    transition: all 0.3s ease;
    font-weight: 600;

    &:hover {
      background: #555;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const Logo = styled(motion.div)`
  cursor: pointer;

  h2 {
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export default Nav;
