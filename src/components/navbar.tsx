import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  Hidden,
  IconButton,
  Fab,
} from "@mui/material";
import sample_logo from "../assets/sample_logo.png";
import { Link } from "react-router-dom";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import AirlineSeatLegroomExtraIcon from "@mui/icons-material/AirlineSeatLegroomExtra";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ForumIcon from "@mui/icons-material/Forum";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../context/AuthContext";
import CustomizedMenus from "./customMenu";
import LoginIcon from "@mui/icons-material/Login";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NavBarLink from "./navbarlink";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import CustomNavbarDrawer from "./customnavbardrawer";
import QuizIcon from "@mui/icons-material/Quiz";
import HideOnScroll from "./hideOnscroll";
import ScrollTop from "./scrollToTheTopButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Person2Icon from '@mui/icons-material/Person2';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isUserSignedIn, changeMode, mode } = useAuth();
  const handleDrawerClose = () => {
    console.log(drawerOpen);

    setDrawerOpen(false);
  };
  const navLinks = [
    { link: "/challenges", text: "حق طلبی", icon: <QuizIcon /> },
    { link: "/scores", text: "جدول امتیازات", icon: <AssessmentIcon /> },
    { link: "/forum", text: "فروم", icon: <ForumIcon /> },
    // {
    //   link: "/Question",
    //   text: "طرح سوال",
    //   icon: <AirlineSeatLegroomExtraIcon />,
    //   show: isUserSignedIn,
    // },
    { link: "/school", text: "آکادمی", icon: <SchoolIcon /> },
    { link: "/profile", text: "پروفایل", icon: <Person2Icon /> },
  ];
  return (
    <>
      <CustomNavbarDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        navLinks={navLinks}
      />
      <HideOnScroll>
        <AppBar elevation={5} position="sticky" sx={{ borderRadius: "5px" }}>
          <Toolbar>
            <Hidden lgDown>
              <img src={sample_logo} alt="logo" height="50px" />
              <Link to="/">
                <Typography
                  variant="h6"
                  sx={{
                    color: mode == "dark" ? "primary" : "white",
                    flexGrow: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  سامانه جامع حق طلبان
                </Typography>
              </Link>
            </Hidden>
            <Hidden mdDown>
              <Grid container spacing={10}>
                <Grid item md={7} sm={isUserSignedIn ? 8 : 7}>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    {navLinks.map((link, index) => (
                      <>
                        {link.show !== false && (
                          <NavBarLink
                            link={link.link}
                            text={link.text}
                            icon={link.icon}
                          />
                        )}
                      </>
                    ))}
                  </Box>
                </Grid>
                <>
                  <Grid item md={1} sm={0}></Grid>
                  <Grid item md={4}>
                    <Box
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {!isUserSignedIn && (
                        <NavBarLink
                          link={"/login"}
                          text={"ورود/ثبت‌نام"}
                          icon={<LoginIcon />}
                        />
                      )}
                      {isUserSignedIn && <CustomizedMenus />}
                      <Grid md={1}>
                        <IconButton
                          sx={{
                            "&:focus": {
                              outline: "none",
                            },
                          }}
                          onClick={changeMode}
                        >
                          {mode == "dark" ? (
                            <DarkModeIcon />
                          ) : (
                            <LightModeIcon />
                          )}
                        </IconButton>
                      </Grid>
                    </Box>
                  </Grid>{" "}
                </>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    mr: 2,
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Box
                margin={"auto"}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link to={"/"}>
                  <img src={sample_logo} alt="logo" height="50px" />
                </Link>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {!isUserSignedIn && (
                  <NavBarLink
                    link={"/login"}
                    text={"ورود/ثبت‌نام"}
                    icon={<LoginIcon />}
                    isRightMargin={false}
                  />
                )}
                {isUserSignedIn && <CustomizedMenus isRightMargin={false} />}
              </Box>
            </Hidden>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Navbar;
