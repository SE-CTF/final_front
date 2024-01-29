import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import { Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface CustomizedMenusProps {
  isRightMargin?: boolean;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({}));

export default function CustomizedMenus({
  isRightMargin,
}: CustomizedMenusProps) {
  const { signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  const open = Boolean(anchorEl);
  const { mode } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoggedOut && <Navigate to="/" replace={true} />}
      <Button
        onClick={handleClick}
        sx={{
          color: mode == "dark" ? "primary" : "white",
          marginRight:
            isRightMargin === undefined || isRightMargin ? "30px" : "0px",
          "&:focus": {
            outline: "none",
          },
        }}
        startIcon={<Person2Icon />}
      >
        {" "}
        <Typography fontSize={"15px"}>پروفایل</Typography>
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <AccountCircleIcon />
          <Typography fontSize={"15px"}>پروفایل</Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut();
            setIsLoggedOut(true);
          }}
          disableRipple
        >
          <LogoutIcon />
          <Typography fontSize={"15px"}>خروج</Typography>
        </MenuItem>
      </StyledMenu>
    </>
  );
}
