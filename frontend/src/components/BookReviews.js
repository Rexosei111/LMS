import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ReviewCard = ({ review }) => {
  const xxs = useMediaQuery("(max-width:299px)");
  return (
    <Card
      sx={{ maxWidth: xxs ? "100%" : 300, maxHeight: 350, flexShrink: 0 }}
      variant="outlined"
      raised={false}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="reviewer email">
              {review.email.charAt(0)}
            </Avatar>
          }
          title={review.email}
          subheader={review.reviewed_at}
        />
        <CardContent>
          <Typography>{review.review}</Typography>
        </CardContent>
        <CardActions>
          <Rating value={review.rating} readOnly size="small" />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

function BookReviews() {
  const params = useParams();
  const [Reviews, setReviews] = useState(null);
  useEffect(() => {
    axios({
      url: `http://localhost:8000/api/books/${params.bookId}/reviews`,
      method: "GET",
    })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [params.bookId]);

  return (
    <Container sx={{ mt: 2 }} disableGutters>
      <Typography variant="h5" my={2}>
        Reviews From Students
      </Typography>
      {Reviews?.length !== 0 ? (
        <Stack direction="row" overflow="hidden" spacing={2}>
          {Reviews?.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </Stack>
      ) : (
        <Container
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            height: 200,
          }}
        >
          <Typography variant="h6" color={"GrayText"}>
            No reviews
          </Typography>
          <Typography variant="body1">
            Be the first to review this book
          </Typography>
        </Container>
      )}
    </Container>
  );
}

export default BookReviews;
