import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import TopNav from "./TopNav";

function Layout() {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        overflowX: "hidden",
      }}
    >
      <TopNav />
      <Outlet />
      <Footer />
    </Container>
  );
}

export default Layout;
