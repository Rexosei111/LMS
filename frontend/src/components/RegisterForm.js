import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  index_number: "",
  phone_number: "",
  programme: "",
  level: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required Field";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid Email Format";
  }
  if (!values.first_name) {
    errors.first_name = "Required Field";
  }
  if (!values.index_number) {
    errors.index_number = "Required Field";
  }
  if (!values.programme) {
    errors.programme = "Required Field";
  }
  if (!values.level) {
    errors.level = "Required Field";
  }
  if (!values.phone_number) {
    errors.phone_number = "Required Field";
  }
  return errors;
};

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(null);
  const large = useMediaQuery("(max-width:900px)");

  const small = useMediaQuery("(max-width:500px)");
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      axios
        .post("http://localhost:8000/api/students/register", values)
        .then((res) => {
          setLoading(false);
          setSuccess(true);
          setError(false);
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
          setLoading(false);
          setSuccess(false);
          setError(true);
          console.log(err.response.data);
          console.log(errorMessage);
        });
      setLoading(false);
    },
    validate,
  });
  return (
    <Container
      maxWidth="xl"
      id="registration"
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: large ? "wrap" : "no-wrap",
        justifyContent: large ? "center" : "flex-start",
        bgcolor: "#faf9f8",
        gap: 4,
        width: "100%",
        py: 2,
      }}
    >
      <Box sx={{ width: small ? "100%" : "50%" }}>
        <Box sx={{ maxWidth: small ? "100%" : 600 }}>
          <Typography
            variant="h4"
            my={2}
            fontFamily={"Josefin Sans"}
            textAlign={small ? "center" : "justify"}
            fontWeight={700}
          >
            Student Registration
          </Typography>
          <Typography variant="body1" textAlign={small ? "center" : "justify"}>
            Students are encourage to submit their required details before books
            can be issued to them.
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
        <Paper variant="outlined" elevation={0} sx={{ p: 2 }}>
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
                  formik.touched.first_name && formik.errors.first_name
                    ? true
                    : false
                }
                id="first_name"
                name="first_name"
                label="First Name"
                helperText={
                  formik.touched.first_name
                    ? formik.errors.first_name
                    : error
                    ? errorMessage.first_name[0]
                    : null
                }
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=""
                autoComplete="current-email"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    formik.touched.first_name && formik.errors.first_name ? (
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
                  formik.touched.last_name && formik.errors.last_name
                    ? true
                    : false
                }
                id="last_name"
                name="last_name"
                label="Last Name"
                helperText={
                  formik.touched.last_name
                    ? formik.errors.last_name
                    : error
                    ? errorMessage.last_name[0]
                    : null
                }
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=""
                autoComplete="current-email"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    formik.touched.last_name && formik.errors.last_name ? (
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
                  (formik.touched.email && formik.errors.email) || error
                    ? true
                    : false
                }
                id="email"
                name="email"
                type="Email"
                label="Email"
                helperText={
                  formik.touched.email
                    ? formik.errors.email
                    : error
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
                    (formik.touched.email && formik.errors.email) || error ? (
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
                  formik.touched.index_number && formik.errors.index_number
                    ? true
                    : false
                }
                id="index_number"
                name="index_number"
                label="Index Number"
                helperText={
                  formik.touched.index_number
                    ? formik.errors.index_number
                    : error
                    ? errorMessage.index_number[0]
                    : null
                }
                value={formik.values.index_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-index_number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    formik.touched.index_number &&
                    formik.errors.index_number ? (
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
                  formik.touched.programme && formik.errors.programme
                    ? true
                    : false
                }
                id="programme"
                name="programme"
                label="programme"
                helperText={
                  formik.touched.programme ? formik.errors.programme : null
                }
                value={formik.values.programme}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-programme"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalLibraryOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    formik.touched.programme && formik.errors.programme ? (
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
                  formik.touched.level && formik.errors.level ? true : false
                }
                id="level"
                name="level"
                type={"number"}
                label="Level"
                helperText={formik.touched.level ? formik.errors.level : null}
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-level"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment:
                    formik.touched.level && formik.errors.level ? (
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
                  formik.touched.phone_number && formik.errors.phone_number
                    ? true
                    : false
                }
                id="phone_number"
                name="phone_number"
                label="Phone"
                helperText={
                  formik.touched.phone_number
                    ? formik.errors.phone_number
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
                    formik.touched.phone_number &&
                    formik.errors.phone_number ? (
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
              loadingPosition="center"
              loading={loading}
              endIcon={<SaveIcon />}
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
            >
              Submit
            </LoadingButton>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterForm;
