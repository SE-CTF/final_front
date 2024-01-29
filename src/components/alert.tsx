import { Snackbar, Alert, Typography } from "@mui/material";
import { useState } from "react";

interface TopAlertProps {
  open: boolean;
  setOpen: any;
  text: string;
  severity: "error" | "warning" | "info" | "success";
  vertical : "top" | "bottom";
  horizontal : "left" | "center" | "right";
}
const CustomAlert = ({ open, setOpen, text, severity , vertical , horizontal }: TopAlertProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal}}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={severity}>
          <Typography>{text}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
