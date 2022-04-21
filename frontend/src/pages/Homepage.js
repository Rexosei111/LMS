import { Box } from "@mui/material";
import React from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import HeroSection from "../components/HeroSection";
import LibraryTime from "../components/LibraryTime";
import RegisterForm from "../components/RegisterForm";

function Homepage() {
  return (
    <>
      <HeroSection />
      <FeaturedBooks />
      <LibraryTime />
      <RegisterForm />
    </>
  );
}

export default Homepage;
