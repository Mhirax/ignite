// src/components/PlatformFilter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlatform } from "../actions/gamesAction";
import { LayoutGrid, Joystick } from "lucide-react";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid } from "react-icons/fa";
import TabBar from "./TabBar";

// Real brand marks where a properly-licensed one exists (react-icons' Font Awesome set).
// Nintendo has no logo in any open-source icon library (pulled after a takedown request),
// so it keeps a generic controller icon instead of a fake/unofficial logo.
const PLATFORMS = [
  { id: "all", name: "All", icon: LayoutGrid },
  { id: "pc", name: "PC", icon: FaWindows },
  { id: "playstation", name: "PlayStation", icon: FaPlaystation },
  { id: "xbox", name: "Xbox", icon: FaXbox },
  { id: "nintendo", name: "Nintendo", icon: Joystick },
  { id: "ios", name: "iOS", icon: FaApple },
  { id: "android", name: "Android", icon: FaAndroid },
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
