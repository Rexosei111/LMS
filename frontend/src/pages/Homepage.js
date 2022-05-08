import React, { useEffect } from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import HeroSection from "../components/HeroSection";
import LibraryTime from "../components/LibraryTime";
import RegisterForm from "../components/RegisterForm";

function Homepage() {
  useEffect(() => {
    const element = document.getElementById("registration");
    if (window.location.hash) element.scrollIntoView();
  }, []);
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
