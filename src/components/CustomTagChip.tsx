import { Chip } from "@mui/material";
import React from "react";

interface CustomTagChipProps {
  text: string;
}

const CustomTagChip = ({ text }: CustomTagChipProps) => {
  let color: string;
  switch (text.toLowerCase()) {
    case "crypto":
      color = "error";
      break;
    case "cracking":
      color = "warning";
      break;
    case "network":
      color = "primary";
      break;
    case "forensics":
      color = "secondary";
      break;
    default:
      color = "success";
  }
  return (
    <>
      <Chip color={color} size="medium" variant="elevated" label={text} />
    </>
  );
};

export default CustomTagChip;
