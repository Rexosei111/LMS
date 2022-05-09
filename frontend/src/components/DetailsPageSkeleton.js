import { Container, ListItem, ListItemText, Skeleton } from "@mui/material";
import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";

function DetailsPageSkeleton() {
  return (
    <Container sx={{ bgcolor: "#faf9f8", my: 2 }} disableGutters={true}>
      <Box>
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9} xl={10} bgcolor="white">
            <Typography variant="h4" pb={2}>
              <Skeleton variant="text" />
            </Typography>
            <Divider />
            <Skeleton width={200} />
            <Typography variant="h6" py={2}>
              <Skeleton width={200} />
            </Typography>
            <Typography varinat="body1" color="GrayText" mb={2}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Typography>
            {/* <BookInfoList info={details} /> */}
            <Grid
              container
              rowSpacing={3}
              columnSpacing={2}
              sx={{ width: "100%" }}
            >
              <Grid item xs="auto">
                <ListItem>
                  <Skeleton variant="circular" width={60} height={60} />
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                  />
                </ListItem>
              </Grid>
              <Grid item xs="auto">
                <ListItem>
                  <Skeleton variant="circular" width={60} height={60} />
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                  />
                </ListItem>
              </Grid>
              <Grid item xs="auto">
                <ListItem>
                  <Skeleton variant="circular" width={60} height={60} />
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                  />
                </ListItem>
              </Grid>
              <Grid item xs="auto">
                <ListItem>
                  <Skeleton variant="circular" width={60} height={60} />
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                  />
                </ListItem>
              </Grid>
              <Grid item xs="auto">
                <ListItem>
                  <Skeleton variant="circular" width={60} height={60} />
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                  />
                </ListItem>
              </Grid>
              <Grid item xs="auto">
                <ListItem>
                  <Skeleton variant="circular" width={60} height={60} />
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton />}
                  />
                </ListItem>
              </Grid>
            </Grid>
            <Typography variant="h5" mt={2} mb={2}>
              <Skeleton width={200} />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default DetailsPageSkeleton;
