import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import BookInfoList from "../components/BookInfoList";

function BookDetailPage() {
  const params = useParams();
  const [book, setBook] = useState({});
  const previewContainer = useRef();

  // const previewBook = (isbn) => {
  //   const newIsbn = isbn.replaceAll("-", "");
  //   console.log(newIsbn);
  //   previewContainer.current.appendChild(
  //     window.GBS_insertEmbeddedViewer(`ISBN:0738531367`, 600, 500)
  //   );
  // };

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
  }, [params.bookId]);

  return (
    <Container
      id="viewerCanvas"
      ref={previewContainer}
      sx={{ bgcolor: "#faf9f8", py: 2, mb: 3 }}
    >
      {/* {window.GBS_insertEmbeddedViewer(`ISBN:0738531367`, 600, 500)} */}
      <Box>
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <img
              src={book.image_link}
              alt=""
              width={"100%"}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9} xl={10} bgcolor="white">
            <Typography variant="h4" pb={2}>
              {book.title}
            </Typography>
            <Divider />
            <Typography variant="h6" py={2}>
              Description
            </Typography>
            <Typography varinat="body1" color="GrayText" mb={2}>
              {book.summary}
            </Typography>
            <BookInfoList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default BookDetailPage;
