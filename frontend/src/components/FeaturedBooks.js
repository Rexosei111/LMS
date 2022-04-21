import { Container, Fab, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const CustomFab = styled(Fab)(({ theme }) => ({
  color: "white",
  backgroundColor: "#2f2e41",
  "&:hover": {
    backgroundColor: "#2f2e4180",
  },
}));
function FeaturedBooks() {
  const [Books, setBooks] = useState([]);
  const recent = useRef();
  useEffect(() => {
    async function getBooks() {
      const { data } = await axios.get(
        "http://localhost:8000/api/books/recent"
      );
      setBooks(data.results);
    }
    getBooks();
  }, []);

  const scrollLeft = () => {
    recent.current.scrollLeft -= 250;
  };

  const scrollRight = () => {
    recent.current.scrollLeft += 250;
  };

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        // height: 360,
        position: "relative",
        bgcolor: "#faf9f8",
        mt: 8,
        py: 2,
      }}
    >
      <Typography
        variant="h4"
        color={"#2f2e41"}
        mb={2}
        textAlign="center"
        fontFamily={"Josefin Sans"}
        fontWeight={700}
      >
        Recently Added Books
      </Typography>
      <CustomFab
        size="medium"
        onClick={scrollLeft}
        sx={{
          position: "absolute",
          top: "50%",
          left: 3,
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon fontSize="medium" />
      </CustomFab>
      <Stack
        ref={recent}
        direction="row"
        overflow="hidden"
        spacing={2}
        sx={{
          "& > img": {
            borderRadius: 5,
          },
        }}
      >
        {Books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </Stack>
      <CustomFab
        size="medium"
        onClick={scrollRight}
        sx={{
          position: "absolute",
          top: "50%",
          right: 3,
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon fontSize="medium" />
      </CustomFab>
    </Container>
  );
}

export default FeaturedBooks;
