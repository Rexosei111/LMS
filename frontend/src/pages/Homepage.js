import { Box } from "@mui/material";
import React from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import HeroSection from "../components/HeroSection";
import LibraryTime from "../components/LibraryTime";

function Homepage() {
  return (
    <>
      <HeroSection />
      <FeaturedBooks />
      <LibraryTime />
    </>
  );
}

export default Homepage;
