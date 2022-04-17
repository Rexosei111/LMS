import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function Paginator({ count, setNext, setPrevious, query }) {
  const pageCount = ~~(count / 20) + 1;
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            component={Link}
            to={`/books?${
              item.page === 1
                ? ""
                : `page=${item.page}${query ? "&" : null}${query}`
            }`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
