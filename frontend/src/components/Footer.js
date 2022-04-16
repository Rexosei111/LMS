import { Container, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Container
      maxWidth="xl"
      sx={{ padding: 2, height: 40, bgcolor: "#2f2e41", color: "white" }}
    >
      <Typography variant="body1" textAlign={"center"}>
        &copy; 2022 Anita Veronica
      </Typography>
    </Container>
  );
}

export default Footer;
