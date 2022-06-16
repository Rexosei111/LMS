import {
  Container,
  Fab,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { API } from "../lib/Axios_init";
import BooksCardSkeleton from "./BooksCardSkeleton";

export const CustomFab = styled(Fab)(({ theme }) => ({
  color: "white",
  backgroundColor: "#2f2e41",
  "&:hover": {
    backgroundColor: "#2f2e4180",
  },
}));
function FeaturedBooks() {
  const [Books, setBooks] = useState([]);
  const [Loading, setLoading] = useState(false);
  const recent = useRef();
  useEffect(() => {
    async function getBooks() {
      setLoading(true);
      try {
        const { data } = await API.get("books/recent");
        setBooks(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (API.isAxiosError(error) && error.response) {
          console.log(error);
        }
      }
    }
    getBooks();
  }, []);

  const sm = useMediaQuery("(max-width: 600px)");

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
      {Loading ? (
        <Stack ref={recent} direction="row" overflow={"hidden"} spacing={2}>
          {[...Array(5).keys()].map((index) => (
            <BooksCardSkeleton wrap={false} key={index} />
          ))}
        </Stack>
      ) : (
        <>
          <CustomFab
            size="medium"
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              top: "50%",
              left: 3,
              zIndex: 2,
              visibility: sm ? "hidden" : "visible",
            }}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </CustomFab>
          <Stack
            ref={recent}
            direction="row"
            overflow={sm ? "auto" : "hidden"}
            spacing={2}
          >
            {Books.map((book) => (
              <BookCard book={book} wrap={false} key={book.id} />
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
              visibility: sm ? "hidden" : "visible",
            }}
          >
            <ArrowForwardIosIcon fontSize="medium" />
          </CustomFab>
        </>
      )}
    </Container>
  );
}

export default FeaturedBooks;
