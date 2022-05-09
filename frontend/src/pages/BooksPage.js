import { Box, Container, MenuItem, TextField } from "@mui/material";
import React, { Suspense, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchField from "../components/searchField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DetailsPageSkeleton from "../components/DetailsPageSkeleton";

const filterOptions = [
  {
    value: "author",
    label: "Author",
  },
  {
    value: "title",
    label: "Title",
  },
  {
    value: "category",
    label: "category",
  },
  {
    value: "isbn",
    label: "Isbn",
  },
];
function BooksPage() {
  const [filter, setFilter] = useState("title");
  const [date, setDate] = React.useState(null);
  const dateRef = useRef();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 2, pt: 2, pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          width: "100%",
        }}
      >
        <SearchField filter={filter} date={dateRef.current?.value || date} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-select-currency"
            select
            label="Filter"
            value={filter}
            onChange={handleChange}
            // helperText="Please select your currency"
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputRef={dateRef}
              disableFuture
              label="publication date"
              openTo="year"
              views={["year", "month", "day"]}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Suspense fallback={<DetailsPageSkeleton />}>
        <Outlet />
      </Suspense>
    </Container>
  );
}

export default BooksPage;
