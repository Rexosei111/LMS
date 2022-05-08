import { Container, List, ListItemButton, Popover } from "@mui/material";
import React from "react";

function Menu({ anchorEl, setAnchorEl }) {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container sx={{ width: 250, height: 100 }}>
      <Popover
        id="simple-popover"
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
    </Container>
  );
}

export default Menu;
