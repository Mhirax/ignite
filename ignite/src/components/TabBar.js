// src/components/TabBar.jsx
import React from "react";
import "./TabBar.scss";

const TabBar = ({ options, activeValue, onSelect }) => (
  <div className="tab-bar">
    <div className="tab-bar__wrapper">
      {options.map((option) => (
        <button
          key={option.id}
          className={`tab-bar__btn ${activeValue === option.id ? "tab-bar__btn--active" : ""}`}
          onClick={() => onSelect(option.id)}
        >
          {option.icon && <option.icon size={16} strokeWidth={2} />}
          {option.name}
        </button>
      ))}
    </div>
  </div>
);

export default TabBar;
