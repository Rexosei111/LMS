import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function LoadingSkeleton() {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        // height: 360,
        position: "relative",
        bgcolor: "#faf9f8",
        mt: 8,
        py: 2,
      }}
    >
      <Typography
        variant="h4"
        color={"#2f2e41"}
        mb={2}
        textAlign="center"
        fontFamily={"Josefin Sans"}
        fontWeight={700}
      >
        Recently Added Bookskjflksdsdjl
      </Typography>
      <Stack
        direction="row"
        overflow="hidden"
        spacing={2}
        sx={{
          "& > img": {
            borderRadius: 5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Skeleton variant="rectangular" width={260} height={300} />
          <Skeleton variant="text" />
          <Skeleton width="80%" variant="text" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Skeleton variant="rectangular" width={260} height={300} />
          <Skeleton variant="text" />
          <Skeleton width="80%" variant="text" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Skeleton variant="rectangular" width={260} height={300} />
          <Skeleton variant="text" />
          <Skeleton width="80%" variant="text" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Skeleton variant="rectangular" width={260} height={300} />
          <Skeleton variant="text" />
          <Skeleton width="80%" variant="text" />
        </Box>
      </Stack>
    </Container>
  );
}

export default LoadingSkeleton;
