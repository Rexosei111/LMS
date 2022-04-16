import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, IconButton, List, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItemButton>Home</ListItemButton>
          <ListItemButton>Register</ListItemButton>
          <ListItemButton>Search</ListItemButton>
        </List>
      </Popover>
    </div>
  );
}
