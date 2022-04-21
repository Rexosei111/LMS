import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { truncateBookTitle } from "./BookCard";

function Details({ currentBook }) {
  const [Book, setBook] = useState({});
  useEffect(() => {
    async function getBooks() {
      const { data } = await axios.get(
        `http://localhost:8000/api/books/${currentBook.id}`
      );
      setBook(data);
    }
    getBooks();
  }, [currentBook]);

  const { id, image_link, image_small_thumbnail, title, summary, ...details } =
    Book;

  return (
    <Suspense fallback="Loading..">
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          // position: "absolute",
          // top: 0,
          // right: 0,
          // width: 400,
          py: 2,
          px: 1,
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          {title}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            // backgroundColor: "black",
          }}
        >
          <img src={Book.image_link} alt="" />
        </div>
        <Typography variant="body1" mt={2} mb={2}>
          {truncateBookTitle(summary)}
        </Typography>
        <Divider />
        <Box sx={{ maxHeight: 250, overflowY: "auto" }}>
          <Typography my={2} variant="h6">
            Book Info
          </Typography>
          <List>
            {Object.entries(details).map((entry) => (
              <ListItem disablePadding>
                <ListItemButton disableRipple>
                  <ListItemText primary={entry[0]} />
                  <Typography variant="body2">
                    {entry[1] ? entry[1] : "-"}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Suspense>
  );
}

export default Details;
