import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SearchField from "../components/searchField";

function BooksPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2, pt: 2, pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          width: "100%",
        }}
      >
        <SearchField />
      </Box>
      <Outlet />
    </Container>
  );
}

export default BooksPage;
