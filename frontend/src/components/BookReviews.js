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
  Skeleton,
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
import { API } from "../lib/Axios_init";
import { Box } from "@mui/system";

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
  const [Loading, setLoading] = useState(false);
  const reviewContainer = useRef();
  const lg = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await API.get(`books/${params.bookId}/reviews`);
        setReviews(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [params.bookId]);

  const scrollLeft = () => {
    reviewContainer.current.scrollLeft -= 250;
  };

  const scrollRight = () => {
    reviewContainer.current.scrollLeft += 250;
  };

  const xxs = useMediaQuery("(max-width:299px)");

  return (
    <Container sx={{ mt: 2, position: "relative" }} disableGutters>
      <Typography variant="h5" my={2}>
        Reviews From Students
      </Typography>
      {Loading ? (
        <Stack direction="row" overflow="hidden" spacing={2}>
          {[...Array(5).keys()].map((index) => (
            <Box
              sx={{ width: xxs ? "100%" : 250, height: 250, flexShrink: 0 }}
              key={index}
            >
              <Skeleton variant="rectangular" width={"100%"} height={"60%"} />
              <Skeleton variant="text" width={"80%"} />
            </Box>
          ))}
        </Stack>
      ) : Reviews?.length !== 0 ? (
        <>
          <CustomFab
            size="medium"
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              top: "50%",
              left: 3,
              zIndex: 2,
              visibility: lg ? "hidden" : "visible",
            }}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </CustomFab>
          <Stack
            direction="row"
            overflow={lg ? "auto" : "hidden"}
            spacing={2}
            ref={reviewContainer}
          >
            {Reviews?.map((review) => (
              <ReviewCard review={review} key={review.id} />
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
              visibility: lg ? "hidden" : "visible",
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
