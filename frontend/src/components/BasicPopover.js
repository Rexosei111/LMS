import * as React from "react";
import Popover from "@mui/material/Popover";
import { Container, IconButton, List, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

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
          <ListItemButton component={Link} to="/">
            Home
          </ListItemButton>
          <ListItemButton>Register</ListItemButton>
          <ListItemButton component={Link} to="/books">
            Search
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}
