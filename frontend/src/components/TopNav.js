import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../images/logo.png";
import { Divider, useMediaQuery } from "@mui/material";
import BasicPopover from "./BasicPopover";
import { Link } from "react-router-dom";

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
  const small = useMediaQuery("(max-width:790px)");

  return (
    <Box
      sx={{
        // flexGrow: 1,
        width: "100%",
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
                component={Link}
                to="/"
              >
                Home
              </Button>
              {window.location.pathname === "/" ? (
                <Button
                  sx={{
                    color: "#6f6efc",
                    borderColor: "#6f6efc",
                    "&:hover": {
                      bgcolor: "#6f6efc",
                      color: "white",
                    },
                  }}
                  variant="outlined"
                  href="/#registration"
                >
                  Register
                </Button>
              ) : (
                <Button
                  sx={{
                    color: "#6f6efc",
                    borderColor: "#6f6efc",
                    "&:hover": {
                      bgcolor: "#6f6efc",
                      color: "white",
                    },
                  }}
                  variant="outlined"
                  component={Link}
                  to="/#registration"
                >
                  Register
                </Button>
              )}
              <Button
                variant="outlined"
                sx={{
                  color: "#6f6efc",
                  borderColor: "#6f6efc",
                  "&:hover": {
                    bgcolor: "#6f6efc",
                    color: "white",
                  },
                }}
                component={Link}
                to="/books"
              >
                Books
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
