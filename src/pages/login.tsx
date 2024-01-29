import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Hidden,
  Box,
  Paper,
  Avatar,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginImg from "../assets/login-img.png";
import LockIcon from "@mui/icons-material/Lock";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import sample_logo from "../assets/sample_logo.png";
import TokenService from "../utils/tokenAccess";
import { Credentials, useAuth } from '../context/AuthContext';

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const {signIn } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    axios
      .post("http://127.0.0.1:8000/api/auth/login/", data)
      .then(function (response) {
        console.log(response);
        const token = response.data.access;
        const credentials : Credentials = {
          email : response.data.email
        }
        signIn(credentials , token)
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(true)
      });
  };
  const customInputLabelStyle = {
    fontFamily: "vazirmatn",
  };
  const customInputInputProps = {
    borderRadius: "8px",
    fontFamily: "vazirmatn",
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isLoggedIn && <Navigate to="/" replace={true} />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">
          <Typography fontFamily={"vazirmatn"}>
            {" "}
            ایمیل یا رمز عبور اشتباه میباشد.
          </Typography>
        </Alert>
      </Snackbar>
      <Paper
        square={false}
        elevation={10}
        style={{
          m: 1,
          minHeight: "85vh",
          marginTop: "5vh",
          marginBottom: "3vh",
          marginRight: "auto",
          marginLeft: "auto",
          maxWidth: isMobile ? "90vw" : isTablet ? "50vw" : "30vw",
          borderRadius: "10px",
        }}
      >
        <Grid justifyContent="center" alignItems="center">
          <Grid item xs={2}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              paddingTop={"0%"}
            >
              <img
                src={sample_logo}
                alt="Logo"
                className="mx-auto"
                height="185"
                style={{ maxWidth: "500px" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography  variant="h3">
                {" "}
                ورود
              </Typography>
            </Box>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              justifyContent="center"
              alignItems="center"
              m={"5%"}
              mt={"10%"}
            >
              <TextField
                {...register("email", { required: true, minLength: 8 })}
                id="email"
                InputLabelProps={{
                  style: customInputLabelStyle,
                }}
                InputProps={{
                  style: customInputInputProps,
                }}
                label="ایمیل"
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                fullWidth
                required
              />
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              m={"5%"}
              mt={"10%"}
            >
              <TextField
                {...register("password", { required: true, minLength: 8 })}
                InputLabelProps={{
                  style: customInputLabelStyle,
                }}
                InputProps={{
                  style: customInputInputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید."
                type={showPassword ? "text" : "password"}
                fullWidth
                required
              />
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              mt={"10%"}
              ml={"35%"}
              mr={"35%"}
            >
              <Button
                type="submit"
                style={{ backgroundColor: "#67b26f" }}
                variant="contained"
                fullWidth
              >
                <Typography fontFamily={"vazirmatn"}>داخل</Typography>
              </Button>
            </Box>
          </form>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={"5%"}
            ml={"5%"}
            mr={"20%"}
          >
            <Typography fontFamily={"vazirmatn"}>
              ثبت نام نکرده‌اید؟{" "}
            </Typography>{" "}
            <Link to="/signup">
              <Typography color={"white"} fontFamily={"vazirmatn"}>
                ثبت نام کنید
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Paper>
    </>
  );
};

export default LoginForm;
