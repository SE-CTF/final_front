import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import sample_logo from "../assets/sample_logo.png";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Credentials, useAuth } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import CustomTextField from "../components/customtextfield";
import CustomAlert from "../components/alert";
import { z, ZodError } from "zod";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  usernameError: string;
  passwordError: string;
  emailError: string;
}

const formDataSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

const SignUpForm = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const { register, handleSubmit } = useForm<FormData>();
  const [alertText, setAlertText] = React.useState("");
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const { signIn } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    usernameError: "",
    passwordError: "",
    emailError: "",
  });

  const handleAlert = (alertText: string, alertOpen: boolean) => {
    setAlertText((prevAlertText) => {
      return alertText;
    });
    setAlertOpen((prevOpen) => {
      return alertOpen;
    });
  };

  const initialErrors = {
    usernameError: "",
    passwordError: "",
    emailError: "",
  };

  const resetErrors = () => {
    setErrors(initialErrors);
  };
  const updateError = (propertyName: string, newValue: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [propertyName]: newValue,
    }));
  };

  const onSubmit = (data: any) => {
    resetErrors();
    try {
      const validatedData = formDataSchema.parse(data);
      axios
        .post("http://localhost:8000/api/auth/signup/", data)
        .then(function (response) {
          console.log(response);
          const token = response.data.access;
          const credentials: Credentials = {
            email: response.data.email,
          };
          signIn(credentials, token);
          setIsSignedUp(true);
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status == 406) {
          } else {
            handleAlert("این ایمیل یا نام کاربری قبلا ثبت شده است.", true);
          }
        });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Form data validation failed:", error.errors);
        error.errors.forEach(
          (validationError: { code: string; path: any[]; message: any }) => {
            if (
              validationError.path[0] == "password" &&
              validationError.code == "too_small"
            ) {
              updateError("passwordError", "رمز عبور حداقل باید ۸ حرف باشد.");
            }
            if (
              validationError.path[0] == "username" &&
              validationError.code == "too_small"
            ) {
              updateError("usernameError", "نام کاربری حداقل باید ۵ حرف باشد");
            }
            if (validationError.path[0] == "email") {
              updateError("emailError", "ایمیل باید به فرمت درست باشد.");
            }
          }
        );
      } else {
        console.error("An unexpected error occurred during validation:", error);
      }
    }
  };
  return (
    <>
      {isSignedUp && <Navigate to="/" replace={true} />}
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        text={alertText}
        severity={"error"}
        vertical={"top"}
        horizontal={"center"}
      />
      <Paper
        square={false}
        elevation={10}
        sx={{
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
          <Grid item lg={2} xs={12}>
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
              <Typography variant="h3"> ثبت نام</Typography>
            </Box>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box justifyContent="center" alignItems="center" m={"5%"} mt={"5%"}>
              <CustomTextField
                multilline={false}
                id={"username"}
                type={"text"}
                placeholder={" نام کاربری خود را وارد کنید"}
                label={"نام کاربری"}
                variant={"outlined"}
                register={register}
                name={"username"}
                fullWidth={true}
                helperText={errors.usernameError}
              ></CustomTextField>
            </Box>
            <Box justifyContent="center" alignItems="center" m={"5%"} mt={"5%"}>
              <CustomTextField
                multilline={false}
                id={"email"}
                type={"text"}
                placeholder={"ایمیل خود را وارد کنید"}
                label={"ایمیل"}
                variant={"outlined"}
                register={register}
                name={"email"}
                fullWidth={true}
                helperText={errors.emailError}
              ></CustomTextField>
            </Box>
            <Box justifyContent="center" alignItems="center" m={"5%"} mt={"5%"}>
              <CustomTextField
                multilline={false}
                id={"password"}
                type={"password"}
                placeholder={"رمز عبور خود را وارد کنید."}
                label={"رمز عبور"}
                variant={"outlined"}
                register={register}
                name={"password"}
                fullWidth={true}
                isPassword={true}
                helperText={errors.passwordError}
              ></CustomTextField>
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              mt={"5%"}
              ml={"35%"}
              mr={"35%"}
            >
              <Button
                type="submit"
                style={{ backgroundColor: "#67b26f" }}
                variant="contained"
                fullWidth
              >
                <Typography fontFamily={"vazirmatn"}>ثبت نام</Typography>
              </Button>
            </Box>
          </form>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={"5%"}
            ml={"auto"}
            mr={"auto"}
            pb={"3%"}
          >
            <Typography fontFamily={"vazirmatn"}>ثبت نام کرده اید؟ </Typography>
            <Box ml={"3%"}>
              <Link to="/login">
                <Typography>ورود</Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Paper>
    </>
  );
};

export default SignUpForm;
