import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../images/logo.png";
import { Divider, useMediaQuery } from "@mui/material";
import BasicPopover from "./BasicPopover";

function LogoText() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        ml={2}
        sx={{
          flexGrow: 1,
          color: "#6f6efc",
          fontFamily: "Beau Rivage",
        }}
      >
        The Univerisity Library
      </Typography>
      <Divider />
      <Typography variant="body2" textAlign={"center"} color="GrayText">
        Ho Technincal Univerisity
      </Typography>
    </Box>
  );
}
export default function TopNav() {
  const [El, setAnchorEl] = React.useState(null);

  const small = useMediaQuery("(max-width:790px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box
      sx={{
        // flexGrow: 1,
        width: "100vw",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent", color: "#2f2e41" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={logo} alt="logo" height={35} width={35} />
            <LogoText />
          </Box>
          {small ? (
            <BasicPopover />
          ) : (
            <Box display={"flex"} gap={1}>
              <Button
                sx={{
                  color: "white",
                  bgcolor: "#2f2e41",
                  "&:hover": {
                    bgcolor: "#6f6efc",
                  },
                }}
              >
                Home
              </Button>
              <Button
                sx={{
                  color: "#6f6efc",
                  "&:hover": {
                    bgcolor: "#6f6efc",
                    color: "white",
                  },
                }}
              >
                Register
              </Button>
              <Button
                sx={{
                  color: "#6f6efc",
                  "&:hover": {
                    bgcolor: "#6f6efc",
                    color: "white",
                  },
                }}
              >
                search
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
