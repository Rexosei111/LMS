import { Box } from "@mui/material";
import React from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LibraryTime from "../components/LibraryTime";

function Homepage() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <HeroSection />
      <FeaturedBooks />
      <LibraryTime />
      <Footer />
    </Box>
  );
}

export default Homepage;
