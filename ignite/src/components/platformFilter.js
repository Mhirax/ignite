// src/components/PlatformFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlatform } from "../actions/gamesAction";
import TabBar from "./TabBar";

const PLATFORMS = [
  { id: "all", name: "All" },
  { id: "pc", name: "PC" },
  { id: "playstation", name: "PlayStation" },
  { id: "xbox", name: "Xbox" },
  { id: "nintendo", name: "Nintendo" },
  { id: "ios", name: "iOS" },
  { id: "android", name: "Android" },
];

const PlatformFilter = () => {
  const dispatch = useDispatch();
  const { activePlatform } = useSelector((state) => state.games);

  return (
    <TabBar
      options={PLATFORMS}
      activeValue={activePlatform}
      onSelect={(platform) => dispatch(setActivePlatform(platform))}
    />
  );
};

export default PlatformFilter;
