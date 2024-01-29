import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavBarLinkProps {
  link: string;
  text: string;
  icon: ReactNode;
  isRightMargin? : boolean;
}

const NavBarLink = ({ link, text, icon,isRightMargin }: NavBarLinkProps) => {
  const { isUserSignedIn , changeMode, mode } = useAuth();
  return (
    <>
      <Link to={link}>
        <Button
          sx={{
            color : mode == "dark" ? "primary" : "white",
            marginRight: (isRightMargin === undefined || isRightMargin)?"30px" : "0px",
            "&:focus": {
              outline: "none",
            },
          }}
          startIcon={icon}
        >
          {" "}
          <Typography variant="body1">
            {text}{" "}
          </Typography>
        </Button>
      </Link>
    </>
  );
};

export default NavBarLink;
