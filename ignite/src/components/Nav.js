// src/components/Nav.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchGames } from "../actions/gamesAction";
import { Search, Menu, X } from "lucide-react";
import "./Nav.scss";

const Nav = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(searchGames(searchInput));
      navigate("/");
      setSearchInput("");
      setIsMenuOpen(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="nav">
      <div className="nav__container">
        {/* Logo - Left */}
        <div className="nav__logo" onClick={() => navigate("/")}>
          <span className="nav__logo-ign">IGN</span>
          <span className="nav__logo-ite">ITE</span>
        </div>

        {/* Search Form - Center */}
        <form className="nav__form" onSubmit={handleSearch}>
          <div className="nav__search-wrapper">
            <Search className="nav__search-icon" size={16} strokeWidth={1.5} />
            <input
              type="text"
              className="nav__input"
              placeholder="Search games..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </form>

        {/* Desktop Navigation Links - Right */}
        <div className="nav__links">
          <button
            className="nav__link"
            onClick={() => scrollToSection("popular")}
          >
            Popular
          </button>
          <button
            className="nav__link"
            onClick={() => scrollToSection("upcoming")}
          >
            Upcoming
          </button>
          <button className="nav__link" onClick={() => scrollToSection("new")}>
            New Games
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="nav__menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`nav__mobile-menu ${isMenuOpen ? "nav__mobile-menu--open" : ""}`}
          ref={menuRef}
        >
          <div className="nav__mobile-links">
            <button
              className="nav__mobile-link"
              onClick={() => scrollToSection("popular")}
            >
              Popular
            </button>
            <button
              className="nav__mobile-link"
              onClick={() => scrollToSection("upcoming")}
            >
              Upcoming
            </button>
            <button
              className="nav__mobile-link"
              onClick={() => scrollToSection("new")}
            >
              New Games
            </button>
          </div>
          <form className="nav__mobile-form" onSubmit={handleSearch}>
            <div className="nav__search-wrapper">
              <Search
                className="nav__search-icon"
                size={16}
                strokeWidth={1.5}
              />
              <input
                type="text"
                className="nav__input"
                placeholder="Search games..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
