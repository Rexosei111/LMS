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
import { API } from "../lib/Axios_init";

function BookDetailPage() {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);
  const previewContainer = useRef();

  useEffect(() => {
    async function fetchBook() {
      try {
        const { data } = await API.get(`books/${params.bookId}`);
        setBook(data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error);
        }
      }
    }

    fetchBook();
  }, [params.bookId]);

  useEffect(() => {
    if (book !== null) {
      window.mycallback = function (data) {
        if (data[`ISBN:${book.isbn.replaceAll("-", "")}`] !== undefined)
          setBookInfo(data[`ISBN:${book.isbn.replaceAll("-", "")}`]);
      };

      const scriptTag = document.createElement("script");
      scriptTag.src = `https://books.google.com/books?bibkeys=ISBN:${book.isbn.replaceAll(
        "-",
        ""
      )}&jscmd=viewapi&callback=mycallback`;
      scriptTag.id = "book-response";
      document.head.appendChild(scriptTag);
    }
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
    <Container sx={{ bgcolor: "#faf9f8", my: 2 }} disableGutters>
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
          <Container>
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

            <Box
              ref={previewContainer}
              id="viewerCanvas"
              sx={{ width: "100%", height: bookInfo?.embeddable ? 550 : 300 }}
            >
              {book && bookInfo && bookInfo.embeddable ? (
                <iframe
                  src={`https://kyei.pythonanywhere.com/api/books/preview/${book.isbn}`}
                  width={"100%"}
                  height={"100%"}
                  title={book.title}
                  style={{ overflow: "hidden" }}
                />
              ) : (
                <Paper
                  variant="outlined"
                  elevation={0}
                  my={2}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    color={"GrayText"}
                    textAlign="center"
                    my={1}
                  >
                    {bookInfo === null || bookInfo?.preview === "noview"
                      ? "This Book is Currently Unvailable for Previewing"
                      : "Unable to Embbed Book Preview"}
                  </Typography>
                  {bookInfo !== null ? (
                    <Typography>
                      You may
                      <Button href={bookInfo.preview_url} target="_blank">
                        Preview
                      </Button>
                      this book on `google books`
                    </Typography>
                  ) : null}
                </Paper>
              )}
            </Box>

            <BookReviews />
            <BookReviewForm />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BookDetailPage;
