import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const truncateBookTitle = (text) => {
  if (text && text.length > 250) {
    return text.slice(0, 250) + " ...";
  }

  return text;
};

function BookCard({ book, wrap = true }) {
  const viewBook = (event, id) => {
    window.location.href = `/books/${id}`;
  };

  return (
    <Card
      sx={{ width: wrap ? "100%" : 260, maxHeight: 350, flexShrink: 0 }}
      variant="outlined"
      raised={false}
    >
      <CardActionArea onClick={(event) => viewBook(event, book.id)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <img src={book.image_small_thumbnail} alt="" />
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            textAlign={"center"}
          >
            {truncateBookTitle(book.title)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {book.author}
            {book.page_count && (
              <Typography variant="caption" color="text.secondary">
                Pages: {book.page_count}
              </Typography>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BookCard;
