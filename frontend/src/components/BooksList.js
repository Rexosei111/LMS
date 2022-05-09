import { Container, Grid, Typography } from "@mui/material";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Paginator from "./Paginator";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

function BooksList() {
  const location = useLocation();
  const [Books, setBooks] = useState([]);
  const [next, setNext] = useState(null);
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState(null);
  const query = useMemo(() => new URLSearchParams(location.search), [location]);

  useEffect(() => {
    async function getBooks() {
      const { data } = await axios.get(
        `https://kyei.pythonanywhere.com/api/books?${query}`
      );
      setBooks(data.results);
      setNext(data.next);
      setCount(data.count);
      setPrevious(data.previous);
    }
    getBooks();
  }, [query]);
  return (
    <>
      <Typography variant="h4" ml={3}>
        {!query.has("search")
          ? "List of Available Books"
          : `Results for '${query.get("search")}'`}
      </Typography>
      <Container maxWidth="xl" sx={{ bgcolor: "#faf9f8", py: 2 }}>
        {Books.length === 0 ? (
          <Typography
            variant="h4"
            component="div"
            sx={{ height: 100, width: "100%", textAlign: "center" }}
          >
            Book Not Found
          </Typography>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems={"flex-start"}
          >
            {Books.map((book) => (
              <Grid item key={book.id} xs={12} sm={5} md={4} lg={3} xl={3}>
                <BookCard book={book} key={book.id} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box
          my={2}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {(next || previous) && (
            <Paginator
              count={count}
              next={next}
              setPrevious={setPrevious}
              previous={previous}
              setNext={setNext}
              query={query}
            />
          )}
        </Box>
      </Container>
    </>
  );
}

export default BooksList;
