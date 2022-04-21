import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import TopNav from "./TopNav";

function Layout() {
  return (
    <Box
      sx={{
        overflowX: "hidden",
        // height: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "space-between",
      }}
    >
      <TopNav />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Layout;
