import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function InfoList({ info }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", mt: 1 }}>
      {info.map((time, index) => (
        <ListItem
          key={index}
          sx={{
            backgroundColor: index % 2 === 0 ? "#2f2e41" : "none",
            color: index % 2 === 0 ? "white" : "black",
          }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: "transparent",
                color: index % 2 === 0 ? "none" : "#2f2e41",
              }}
            >
              <AccessTimeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography variant="h6">
              {time[0]} :{" "}
              <Typography variant="body1" component="span">
                {time[1]}
              </Typography>
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default InfoList;
