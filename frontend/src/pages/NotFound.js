import { Container, Divider, Stack, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Typography variant="h2">404</Typography>
        <Typography variant="body1">Page Not Found</Typography>
      </Stack>
    </div>
  );
}

export default NotFound;
