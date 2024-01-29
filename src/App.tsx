import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";
import QuickFilteringGrid from "./pages/challanges";
import Scoreboard from "./pages/scoreboard";
import ForumPage from "./pages/forum";
import PostDetailPage from "./pages/postDetail";
import Question from "./pages/question";
import SignUpForm from "./pages/signup";
import Profile from "./pages/profile";
import School from "./pages/school";
import TokenService from "./utils/tokenAccess";
import { useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey, deepOrange } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import HideOnScroll from "./components/hideOnscroll";
import ChallengesAdmin from "./pages/adminChallange";
import UserAdmin from "./pages/userAdmin";
const darkTheme = createTheme({
  typography: {
    fontFamily: "vazirmatn, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#FF4081",
    },
    background: {
      default: "#343541",
      paper: "rgb(0,0,0)",
    },
  },
});

const lightTheme = createTheme({
  typography: {
    fontFamily: "vazirmatn, sans-serif",
  },
  palette: {
    mode: "light",
  },
});

/*const initialPosts = [
  {
    id: 1,
    topic: 'بحث اول',
    text: 'Lorem ipsum dolor sit amet.',
    author: 'author@example.com',
    createdAt: new Date(),
    comments: [],
  },
  {
    id: 2,
    topic: 'بحث دوم',
    text: 'Consectetur adipiscing elit.',
    author: 'author2@example.com',
    createdAt: new Date(),
    comments: [],
  },
  {
    id: 3,
    topic: 'بحث سوم',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'author3@example.com',
    createdAt: new Date(),
    comments: [],
  },
  // Add more posts as needed
];*/

const App = () => {
  const { mode } = useAuth();
  return (
    <>
      <ThemeProvider theme={mode == "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/challenges" element={<QuickFilteringGrid />} />
          <Route path="/Scores" element={<Scoreboard />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/question" element={<Question />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/school" element={<School />} />
          <Route path="/challange_admin" element={<ChallengesAdmin />} />
          <Route path="/user_admin" element={<UserAdmin />} />
        </Routes>
      </ThemeProvider>
      {""}
    </>
  );
};

export default App;
