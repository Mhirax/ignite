// src/components/Nav.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchGames } from "../actions/gamesAction";
import styled from "styled-components";

const Nav = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(searchGames(searchInput));
      navigate("/");
      setSearchInput("");
    }
  };

  return (
    <NavBar>
      <Logo onClick={() => navigate("/")}>IGNITE</Logo>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search games..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
    </NavBar>
  );
};

// const NavBar = styled.nav`
//   background: linear-gradient(135deg, #b63737 0%, #ff4f4f 100%);
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//   position: sticky;
//   top: 0;
//   z-index: 100;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 1rem;
//     padding: 1rem;
//   }
// `;

// const Logo = styled.div`
//   color: white;
//   font-size: 1.8rem;
//   font-weight: bold;
//   cursor: pointer;
//   letter-spacing: 1px;

//   &:hover {
//     transform: scale(1.02);
//   }
// `;

// const SearchForm = styled.form`
//   display: flex;
//   gap: 0.5rem;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 0.8rem 1.2rem;
//   font-size: 1rem;
//   border: none;
//   border-radius: 30px;
//   width: 300px;
//   outline: none;
//   background: white;

//   &:focus {
//     box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchButton = styled.button`
//   padding: 0.8rem 1.5rem;
//   font-size: 1rem;
//   background: #333;
//   color: white;
//   border: none;
//   border-radius: 30px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   font-weight: 600;

//   &:hover {
//     background: #555;
//     transform: translateY(-2px);
//   }
// `;

export default Nav;
