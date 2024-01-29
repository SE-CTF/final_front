import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Person2Icon from "@mui/icons-material/Person2";
import { useAuth } from "../context/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { dark } from "@mui/material/styles/createPalette";
import { Link } from "react-router-dom";

interface CustomNavbarDrawerProps {
  open: boolean;
  onClose: () => void;
  navLinks: any[];
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const CustomNavbarDrawer = ({
  open,
  onClose,
  navLinks,
}: CustomNavbarDrawerProps) => {
  const { changeMode, mode } = useAuth();
  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        onKeyDown={onClose}
        SlideProps={{ direction: "left" }}
      >
        <DrawerHeader>
          <Avatar
            sx={{
              bgcolor: mode === "dark" ? "white" : "black",
              marginRight: "auto",
            }}
          >
            <Person2Icon />
          </Avatar>
          <br />
          <IconButton
            sx={{
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={changeMode}
          >
            {mode == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box>
          <List>
            {navLinks.map((value, index) => (
              <ListItem key={value.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <Link to={value.link}>
                    <ListItemText>
                      <Typography color={mode == "dark" ? "white" : "black"}>
                        {value.text}
                      </Typography>
                    </ListItemText>
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default CustomNavbarDrawer;
