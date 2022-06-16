import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Grid } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CategoryIcon from "@mui/icons-material/Category";
import BadgeIcon from "@mui/icons-material/Badge";
import EventIcon from "@mui/icons-material/Event";
import PagesIcon from "@mui/icons-material/Pages";
import NumbersIcon from "@mui/icons-material/Numbers";

const formatText = (text) => {
  const newText = text.replaceAll("_", " ").toLowerCase();
  return newText.charAt(0).toUpperCase() + newText.slice(1);
};

const icons = {
  language: <LanguageIcon />,
  category: <CategoryIcon />,
  author: <BadgeIcon />,
  publisher: <BadgeIcon />,
  published_date: <EventIcon />,
  page_count: <PagesIcon />,
  available_copies: <NumbersIcon />,
};
export default function BookInfoList({ info }) {
  return (
    <Grid container rowSpacing={3} columnSpacing={2} sx={{ width: "100%" }}>
      {Object.entries(info).map((entry, index) => {
        return (
          <Grid item xs="auto" key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>{icons[entry[0]] || <ImageIcon />}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={formatText(entry[0])}
                secondary={entry[1]}
              />
            </ListItem>
          </Grid>
        );
      })}
    </Grid>
  );
}
