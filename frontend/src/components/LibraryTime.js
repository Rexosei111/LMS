import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import libTime from "../images/time.svg";
import InfoList from "./InfoList";

const times = [
  ["Monday - Friday", "9:00am - 10:00pm"],
  ["Saturday", "9:00am - 4:00pm"],
  ["Sunday", "9:00am - 4:00pm"],
];

const memberShip = [
  ["Under-graduate Student", "Up to 2 books for 2 weeks"],
  ["Post-graduate & Research Student", "Up to 3 books at a time"],
  ["Senior Memebers", "Up to 6 books for 4 weeks"],
];

function LibraryTime() {
  const large = useMediaQuery("(min-width:950px)");
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 2,
        pt: 2,
        pb: 2,
        display: "flex",
        flexWrap: { xl: "wrap" },
        gap: 2,
      }}
    >
      <Box sx={{ width: large ? "50%" : "100%" }} padding={2}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            fontFamily: "Josefin Sans",
            fontWeight: 700,
          }}
        >
          <Box bgcolor={"#6f6efc"} sx={{ height: 30, width: 8 }}></Box>
          The Library At A Glance
        </Typography>
        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="h6">Semester Time</Typography>
        </Divider>
        <InfoList info={times} />
        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="h6">Membership Benefit</Typography>
        </Divider>
        <InfoList info={memberShip} />
        <Divider textAlign="left" sx={{ mt: 2 }}>
          <Typography variant="h6">Note</Typography>
        </Divider>
        <Typography variant="h6">
          Closed :{" "}
          <Typography variant="body1" component="span">
            Public Holidays
          </Typography>
        </Typography>
      </Box>
      {/* <Divider orientation="vertical" /> */}
      {large && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          <img
            src={libTime}
            alt=""
            // width={"50%"}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </Box>
      )}
    </Container>
  );
}

export default LibraryTime;
