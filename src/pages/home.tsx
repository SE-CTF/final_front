import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  CardActionArea,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import learn from "../assets/learn.png";
import learn2 from "../assets/learn2.jpg";
import learning_community from "../assets/learning_community.png";
import sample_logo from "../assets/sample_logo.png";
import FirstPageCustomCard from "../components/firstPageCustomCard";

const Home = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const isNotMobile = useMediaQuery(useTheme().breakpoints.up("sm"));
  return (
    <>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img
            src={sample_logo}
            alt="Logo"
            height={isMobile ? "200" : isTablet ? "250" : "350"}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="h4"
            component="div"
            align="center"
            style={{ maxWidth: isMobile ? "100%" : isTablet ? "85%" : "70%" }}
          >
            آموزش ، یادگیری ، رقابت
          </Typography>
        </Box>
        <Box
          mt={isMobile ? "10%" : isTablet ? "5%" : "3%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="body1"
            component="div"
            align="center"
            style={{ maxWidth: isMobile ? "100%" : isTablet ? "85%" : "70%" }}
          >
            این سایت به منظور ارائه سوال و چالش در زمینه امنیت سایبری ساخته شده است/
          </Typography>
        </Box>
        <Box mt={isTablet ? "20%" : "7%"} mb={"10%"}>
          <Grid
            container
            spacing={isTablet ? 6 : 10}
            alignItems="center"
            justifyContent={"center"}
          >
            <Grid item xs={12} sm={6} md={4}>
              <FirstPageCustomCard
                cardTitle={"آموزش"}
                cardText={
                  "با استفاده از فورم و و سوالات میتوانید مهارت های خود را ارتقا دهید"
                }
                cardImageSource={learn}
                cardImageAlt={"learn"}
                isNotMobile={isNotMobile}
                link={"/school"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FirstPageCustomCard
                cardTitle={"یادگیری"}
                cardText={
                  "امنیت سایبری را عمیقا یاد بگیرید"
                }
                cardImageSource={learn2}
                cardImageAlt={"learn2"}
                isNotMobile={isNotMobile}
                link={"/challenges"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FirstPageCustomCard
                cardTitle={"رقابت"}
                cardText={
                  "با دیگران کاربران رقابت کنید"
                }
                cardImageSource={learning_community}
                cardImageAlt={"learning_community"}
                isNotMobile={isNotMobile}
                link={"/Scores"}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
