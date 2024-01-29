import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
  Grid,
  styled,
  Divider,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import BasicPopover from "./basicpopover";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import TokenService from "../utils/tokenAccess";
import CustomAlert from "./alert";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CustomTextField from "./customtextfield";
import FlagIcon from "@mui/icons-material/Flag";
import CustomButton from "./custombutton";
import CustomTagChip from "./CustomTagChip";
interface DialogProps {
  open: boolean;
  handleclose: () => void;
  title: string;
  solved: boolean;
  description: string;
  score: number;
  category: string;
  hints: string[];
  id: number;
  fullScreen: boolean;
}

function DialogComponent({
  open,
  handleclose,
  title,
  solved,
  description,
  score,
  category,
  hints,
  id,
  fullScreen,
}: DialogProps) {
  const StyledMarkdown = styled("div")({
    fontFamily: "vazirmatn",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "white",
  });
  const { register, handleSubmit } = useForm();
  const { user, isUserSignedIn } = useAuth();
  const { mode } = useAuth();

  

  const [alertText, setAlertText] = React.useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("info");

  const handleAlert = (
    alertText: string,
    alertOpen: boolean,
    alertSeverity: string
  ) => {
    setAlertText(() => {
      return alertText;
    });
    setAlertSeverity(() => {
      return alertSeverity;
    });
    setAlertOpen(() => {
      return alertOpen;
    });
  };

  const onSubmit = (data: any) => {
    console.log(id);
    console.log(user?.email);
    console.log(TokenService.decodeToken());

    console.log("Form submitted:", data);
    axios
      .post(`http://localhost:8000/api/challenges/${id}/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TokenService.getToken(),
        },
      })
      .then(function (response) {
        handleAlert("سوال درست حل شد", true, "success");
      })
      .catch(function (error) {
        handleAlert("falg پیدا شده نادرست است", true, "error");
      });
  };

  return (
    <>
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        text={alertText}
        severity={alertSeverity}
        vertical={"top"}
        horizontal={"center"}
      />
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleclose}
        fullScreen={fullScreen}
      >
        <DialogTitle mt={"2%"}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              {" "}
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item>
              <>
                <Box display={"flex"}>
                  <Box display={"flex"} mt={"20%"} width={"120%"}>
                    <PersonIcon />
                    <Divider orientation="vertical" variant="fullWidth" />
                    <Typography>    {score.toLocaleString("fa-EG")} امتیاز</Typography>
                  </Box>
                  <IconButton
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                    color="info"
                    aria-label="delete"
                    onClick={handleclose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box display={"flex"}>
              <Typography variant="h6">دسته بندی:</Typography>
              <Box ml={"1%"}>
                <CustomTagChip text={category} />
              </Box>
            </Box>
          </DialogContentText>
          <br />
          <Divider variant="middle" />
          <br />
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={9}>
              <DialogContentText>
                {" "}
                <Typography variant="h6">توضیحات:</Typography>
              </DialogContentText>
              <DialogContentText>
                <StyledMarkdown>
                  {false ? (
                    <span style={{ color: "black" }}>
                      <ReactMarkdown remarkPlugins={[gfm]}>
                        {description}
                      </ReactMarkdown>
                    </span>
                  ) : (
                    <ReactMarkdown remarkPlugins={[gfm]}>
                      {description}
                    </ReactMarkdown>
                  )}
                </StyledMarkdown>
              </DialogContentText>
            </Grid>
            <Grid item xs={12} md={3} justifyContent={"center"}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {hints?.map((value, index) => (
                  <BasicPopover hint={value} id={index.toString()} />
                ))}
              </Box>
            </Grid>
          </Grid>
          <br />
          <Divider variant="middle" />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={12} md={10}>
                <CustomTextField
                  multilline={false}
                  id={"flag"}
                  type={"text"}
                  placeholder={"flag"}
                  label={""}
                  variant={"outlined"}
                  register={register}
                  name={"flag"}
                  disabled={solved || !isUserSignedIn}
                  fullWidth
                  icon={<FlagIcon />}
                ></CustomTextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CustomButton
                    buttonText={"ثبت"}
                    type={"submit"}
                    disabled={!isUserSignedIn}
                    typoGraphyVariant={"h5"}
                  />
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogComponent;
