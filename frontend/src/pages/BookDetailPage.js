import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BookInfoList from "../components/BookInfoList";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import BookReviewForm from "../components/BookReviewForm";
import BookReviews from "../components/BookReviews";

function BookDetailPage() {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [embbed, setEmbbed] = useState(false);
  const previewContainer = useRef();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/books/${params.bookId}`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // window.google.books.load();
  }, [params.bookId]);

  useEffect(() => {
    function initialize() {
      const viewer = new window.google.books.DefaultViewer(
        document.getElementById("viewerCanvas")
      );
      viewer.load(
        `ISBN:${book.isbn.replaceAll("-", "")}`,
        () => setEmbbed(false),
        () => setEmbbed(true)
      );
    }
    if (book?.embeddable) window.google.books.setOnLoadCallback(initialize);
  }, [book]);

  const {
    id,
    image_link,
    image_small_thumbnail,
    title,
    summary,
    embeddable,
    average_rating,
    ...details
  } = book || {};

  return (
    <Container sx={{ bgcolor: "#faf9f8", my: 2 }} disableGutters={true}>
      <Box>
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <img
              src={image_link}
              alt=""
              width={"100%"}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9} xl={10} bgcolor="white">
            <Typography variant="h4" pb={2}>
              {title}
            </Typography>
            <Divider />
            <Tooltip title="Ratings from Google" placement="right">
              <Rating value={average_rating || null} precision={0.5} readOnly />
            </Tooltip>
            <Typography variant="h6" py={2}>
              Description
            </Typography>
            <Typography varinat="body1" color="GrayText" mb={2}>
              {summary}
            </Typography>
            <BookInfoList info={details} />
            <Typography variant="h5" mt={2} mb={2}>
              Preview Book
            </Typography>
            {embbed ? (
              <Box
                ref={previewContainer}
                id="viewerCanvas"
                sx={{ width: "100%", height: 500 }}
              ></Box>
            ) : (
              <Paper
                variant="outlined"
                elevation={0}
                my={2}
                sx={{
                  width: "100%",
                  height: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  color={"GrayText"}
                  textAlign="center"
                  my={2}
                >
                  Unable to Embbed Preview
                </Typography>
                <Button variant="contained">Preview</Button>
              </Paper>
            )}
            <BookReviews />
            <BookReviewForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default BookDetailPage;
