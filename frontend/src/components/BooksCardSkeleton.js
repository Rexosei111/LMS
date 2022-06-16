import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function BooksCardSkeleton({ wrap = true }) {
  return (
    <Box sx={{ width: wrap ? "100%" : 260, height: 260, flexShrink: 0 }}>
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "80%" }} />
      <Typography textAlign={"center"} my={1} variant="h6">
        <Skeleton variant="text" width={"80%"} />
      </Typography>
      <Skeleton variant="text" width={"100%"} />
    </Box>
  );
}
