import { Grid } from "@mui/material";
import React from "react";
import BooksCardSkeleton from "./BooksCardSkeleton";

export default function BooksListSkeleton() {
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems={"flex-start"}
    >
      {[...Array(10).keys()].map((index) => (
        <Grid item key={index} xs={12} sm={5} md={4} lg={3} xl={3}>
          <BooksCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
