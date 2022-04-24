import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchField({ filter, date }) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleEnterSearch = (event) => {
    if (query.length === 0) return false;
    if (event.key === "Enter") {
      navigate(
        `/books?search=${query}${filter ? `&filter=${filter}` : ""}${
          date ? `&pub_date=${date}` : ""
        }`
      );
    }
  };

  const handleSearch = (event) => {
    navigate(`/books?search=${query}`);
  };
  return (
    <Stack spacing={2} mt={2}>
      <TextField
        label="Search for book"
        onChange={handleChange}
        onKeyPress={handleEnterSearch}
        sx={{
          // backgroundColor: "black",
          maxWidth: 500,
          borderRadius: 5,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearch}
                disabled={query.length === 0 ? true : false}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> */}
    </Stack>
  );
}
