import React, { Suspense, useEffect } from "react";
import FeaturedBooks from "../components/FeaturedBooks";
import HeroSection from "../components/HeroSection";
import LibraryTime from "../components/LibraryTime";
import RegisterForm from "../components/RegisterForm";
import LoadingSkeleton from "../components/Skeleton";

function Homepage() {
  useEffect(() => {
    const element = document.getElementById("registration");
    if (window.location.hash) element.scrollIntoView();
  }, []);
  return (
    <>
      <HeroSection />
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedBooks />
      </Suspense>
      <LibraryTime />
      <RegisterForm />
    </>
  );
}

export default Homepage;
