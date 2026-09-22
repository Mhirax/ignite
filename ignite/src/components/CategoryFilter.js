// src/components/CategoryFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../actions/gamesAction";
import { CATEGORIES } from "../api";
import TabBar from "./TabBar";

const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(([id, { label }]) => ({
  id,
  name: label,
}));

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.games);

  return (
    <TabBar
      options={CATEGORY_OPTIONS}
      activeValue={activeCategory}
      onSelect={(category) => dispatch(setActiveCategory(category))}
    />
  );
};

export default CategoryFilter;
