import React from "react";
import Container from "@mui/material/Container";
import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import SearchField from "../components/searchField";
import TopNav from "../components/TopNav";
import heroImg from "../images/hero1.svg";
import { Link } from "react-router-dom";

export const CTAButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#2f2e41",
  "&:hover": {
    backgroundColor: "#6f6efc",
    color: "white",
  },
}));
function HeroSection() {
  const large = useMediaQuery("(min-width:950px)");

  return (
    <Container
      maxWidth="xl"
      sx={{
        // height: large ? "100vh" : "70vh",
        width: "100vw",

        display: "flex",
        flexDirection: "column",
        // gap: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Box
          p={2}
          sx={{
            width: large ? "50%" : "100%",
            display: large ? "initial" : "flex",
            flexDirection: large ? "initial" : "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            color={"#6f6efc"}
            sx={{
              fontFamily: "Josefin Sans",
              fontWeight: 700,
              textAlign: large ? "initial" : "center",
            }}
          >
            Start reading your favorite books
          </Typography>
          <Typography
            variant="body1"
            color={"#2f2e41"}
            textAlign={large ? "initial" : "center"}
          >
            Access over 5000 books for your research works, and personal
            studies.
            <br />
            Filter your search by Author, title, subjects, etc.
          </Typography>
          <SearchField />
          <CTAButton sx={{ mt: 2 }} component={Link} to="books">
            View Books
          </CTAButton>
        </Box>
        {large && (
          <img
            src={heroImg}
            alt=""
            width={"50%"}
            height={"100%"}
            style={{ objectFit: "contain" }}
          ></img>
        )}
      </Box>
    </Container>
  );
}

export default HeroSection;
