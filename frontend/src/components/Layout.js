import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import TopNav from "./TopNav";

function Layout() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <TopNav />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Layout;
