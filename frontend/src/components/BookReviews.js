import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Fab,
  Rating,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
          subheader={new Date(review.reviewed_at).toDateString()}
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

export const CustomFab = styled(Fab)(({ theme }) => ({
  color: "white",
  backgroundColor: "#2f2e41",
  "&:hover": {
    backgroundColor: "#2f2e4180",
  },
}));

function BookReviews() {
  const params = useParams();
  const [Reviews, setReviews] = useState(null);
  const reviewContainer = useRef();
  const fabLeft = useRef();
  const fabRight = useRef();

  useEffect(() => {
    axios({
      url: `https://kyei.pythonanywhere.com/api/books/${params.bookId}/reviews`,
      method: "GET",
    })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [params.bookId]);

  const scrollLeft = () => {
    reviewContainer.current.scrollLeft -= 250;
  };

  const scrollRight = () => {
    reviewContainer.current.scrollLeft += 250;
  };

  const showScroll = () => {
    fabLeft.current.style.visibility = "visible";
    fabRight.current.style.visibility = "visible";
  };
  const hideScroll = () => {
    fabLeft.current.style.visibility = "hidden";
    fabRight.current.style.visibility = "hidden";
  };
  return (
    <Container sx={{ mt: 2, position: "relative" }} disableGutters>
      <Typography variant="h5" my={2}>
        Reviews From Students
      </Typography>
      {Reviews?.length !== 0 ? (
        <>
          <CustomFab
            size="medium"
            onClick={scrollLeft}
            ref={fabLeft}
            onMouseEnter={showScroll}
            onMouseLeave={hideScroll}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              zIndex: 2,
              visibility: "hidden",
            }}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </CustomFab>
          <Stack
            direction="row"
            overflow="hidden"
            spacing={2}
            ref={reviewContainer}
            onMouseEnter={showScroll}
            onMouseLeave={hideScroll}
          >
            {Reviews?.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </Stack>
          <CustomFab
            size="medium"
            onClick={scrollRight}
            ref={fabRight}
            onMouseEnter={showScroll}
            onMouseLeave={hideScroll}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              zIndex: 2,
              visibility: "hidden",
            }}
          >
            <ArrowForwardIosIcon fontSize="medium" />
          </CustomFab>
        </>
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
