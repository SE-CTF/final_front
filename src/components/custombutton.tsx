import { Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";

interface CustomButtonProps {
  onClick?: Function;
  buttonText: string;
  type?: "submit" | "button" | " reset";
  disabled?: boolean;
  color?: string;
  variant?: "contained" | "outlined" | "text";
  icon?: ReactElement;
  fullWidth?: boolean;
  typoGraphyVariant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | null;
}

const CustomButton = ({
  onClick,
  buttonText,
  type,
  disabled,
  color,
  variant,
  icon,
  fullWidth,
  typoGraphyVariant,
}: CustomButtonProps) => {
  return (
    <>
      <Button
        fullWidth={fullWidth == undefined ? true : fullWidth}
        onClick={onClick !== undefined ? onClick : () => {}}
        color={color === undefined ? "success" : color}
        style={{ height: "100%", width: "100%" }}
        variant={variant === undefined ? "contained" : color}
        type={type !== undefined ? type : "submit"}
        disabled={disabled == undefined ? false : disabled}
        startIcon={icon}
      >
        <Typography variant={typoGraphyVariant}>{buttonText}</Typography>
      </Button>
    </>
  );
};

export default CustomButton;
