// src/components/PlatformFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlatform } from "../actions/gamesAction";
import { LayoutGrid, Monitor, Gamepad2, Gamepad, Joystick, Apple, Smartphone } from "lucide-react";
import TabBar from "./TabBar";

const PLATFORMS = [
  { id: "all", name: "All", icon: LayoutGrid },
  { id: "pc", name: "PC", icon: Monitor },
  { id: "playstation", name: "PlayStation", icon: Gamepad2 },
  { id: "xbox", name: "Xbox", icon: Gamepad },
  { id: "nintendo", name: "Nintendo", icon: Joystick },
  { id: "ios", name: "iOS", icon: Apple },
  { id: "android", name: "Android", icon: Smartphone },
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
