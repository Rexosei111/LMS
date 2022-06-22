import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { API } from "../utils/Axios_init";

const initialValues = {
  email: "",
  phone_number: "",
  title: "",
  author: "",
  isbn: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required Field";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid Email Format";
  }
  if (!values.title) {
    errors.title = "Required Field";
  }

  return errors;
};

function BookRecommendation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(null);
  const large = useMediaQuery("(max-width:900px)");
  const formRef = useRef();

  const small = useMediaQuery("(max-width:500px)");
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await API.post("books/recommend", values);
        setLoading(false);
        setSuccess(true);
        setError(false);
      } catch (error) {
        if (API.isAxiosError(error) && error.response) {
          setErrorMessage((prevState) => ({
            ...prevState,
            ...error.response.data,
          }));
        }
        setLoading(false);
        setSuccess(false);
        setError(true);
      }
    },
    validate,
  });

  return (
    <Container
      maxWidth="xl"
      ref={formRef}
      id="registration"
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: large ? "wrap" : "no-wrap",
        justifyContent: large ? "center" : "flex-start",
        gap: 4,
        width: "100%",
        py: 2,
        mb: 4,
      }}
    >
      <Box sx={{ width: small ? "100%" : "50%" }} order={large ? 0 : 2}>
        <Box sx={{ maxWidth: small ? "100%" : 600 }}>
          <Typography
            variant="h4"
            my={2}
            fontFamily={"Josefin Sans"}
            textAlign={small ? "center" : "justify"}
            fontWeight={700}
          >
            Recommend A Book
          </Typography>
          <Typography variant="body1" textAlign={small ? "center" : "justify"}>
            After Scheming through our books collection, students are encouraged
            to recommend any book which is worth reading by students. To do
            that, kindly fill and submit the form in this section.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: small ? "100%" : "50%",
        }}
      >
        <Paper
          variant="outlined"
          elevation={0}
          sx={{ p: 2, width: small ? "100%" : null }}
        >
          <form
            action="#"
            method="POST"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: small ? "100%" : 400,
            }}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <TextField
                error={
                  (formik.touched.email && formik.errors.email) ||
                  (error && errorMessage.email)
                    ? true
                    : false
                }
                id="email"
                name="email"
                type="Email"
                label="Email"
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : error && errorMessage.email
                    ? errorMessage.email[0]
                    : null
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="your-email@provider.com"
                autoComplete="current-email"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    (formik.touched.email && formik.errors.email) ||
                    (error && errorMessage.email) ? (
                      <InputAdornment position="end">
                        <ErrorOutlineIcon color="error" />
                      </InputAdornment>
                    ) : undefined,
                }}
                fullWidth
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <TextField
                error={
                  (formik.touched.phone_number && formik.errors.phone_number) ||
                  (error && errorMessage.phone_number)
                    ? true
                    : false
                }
                id="phone_number"
                name="phone_number"
                label="Phone"
                helperText={
                  formik.touched.phone_number && formik.errors.phone_number
                    ? formik.errors.phone_number
                    : error && errorMessage.phone_number
                    ? errorMessage.phone_number[0]
                    : null
                }
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-phone_number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    (formik.touched.phone_number &&
                      formik.errors.phone_number) ||
                    (error && errorMessage.phone_number) ? (
                      <InputAdornment position="end">
                        <ErrorOutlineIcon color="error" />
                      </InputAdornment>
                    ) : undefined,
                }}
                fullWidth
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <TextField
                error={
                  (formik.touched.title && formik.errors.title) ||
                  (error && errorMessage.title)
                    ? true
                    : false
                }
                id="title"
                name="title"
                label="title"
                helperText={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : error && errorMessage.title
                    ? errorMessage.title[0]
                    : null
                }
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-title"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    (formik.touched.title && formik.errors.title) ||
                    (error && errorMessage.title) ? (
                      <InputAdornment position="end">
                        <ErrorOutlineIcon color="error" />
                      </InputAdornment>
                    ) : undefined,
                }}
                fullWidth
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <TextField
                error={
                  (formik.touched.author && formik.errors.author) ||
                  (error && errorMessage.author)
                    ? true
                    : false
                }
                id="author"
                name="author"
                label="Author"
                helperText={
                  formik.touched.author && formik.errors.author
                    ? formik.errors.author
                    : error && errorMessage.author
                    ? errorMessage.author[0]
                    : null
                }
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-author"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalLibraryOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    (formik.touched.author && formik.errors.author) ||
                    (error && errorMessage.author) ? (
                      <InputAdornment position="end">
                        <ErrorOutlineIcon color="error" />
                      </InputAdornment>
                    ) : undefined,
                }}
                fullWidth
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <TextField
                error={
                  (formik.touched.isbn &&
                    formik.errors.isbn &&
                    formik.values.isbn.trim()) ||
                  (error && errorMessage.isbn)
                    ? true
                    : false
                }
                id="isbn"
                name="isbn"
                type={"isbn"}
                label="ISBN"
                helperText={
                  formik.touched.isbn &&
                  formik.errors.isbn &&
                  formik.values.isbn.trim()
                    ? formik.errors.isbn
                    : error && errorMessage.isbn
                    ? errorMessage.isbn[0]
                    : null
                }
                value={formik.values.isbn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-isbn"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    (formik.touched.isbn &&
                      formik.errors.isbn &&
                      formik.values.isbn.trim()) ||
                    (error && errorMessage.isbn) ? (
                      <InputAdornment position="end">
                        <ErrorOutlineIcon color="error" />
                      </InputAdornment>
                    ) : undefined,
                }}
                fullWidth
              />
            </div>
            <LoadingButton
              variant="contained"
              type="submit"
              endIcon={<SaveIcon />}
              loadingPosition="end"
              loading={loading}
              sx={{
                bgcolor: error ? "#fd251a" : success ? "#55ab6f" : "#2f2e41",
                "&:hover": {
                  bgcolor: error
                    ? "#fd251a90"
                    : success
                    ? "#55ab6f90"
                    : "#6f6efc",
                },
              }}
              disabled={Object.entries(formik.errors).length > 0 ? true : false}
              fullWidth
            >
              Submit
            </LoadingButton>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default BookRecommendation;
