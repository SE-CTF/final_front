import { Box, Link, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { title } from "@uiw/react-md-editor";

interface CostomBoxLinkProps {
  link: string;
  title: string;
}

const CostomBoxLink = ({ link, title }: CostomBoxLinkProps) => {
  return (
    <>
      <Box justifyContent={"center"} mt={"3%"} pl={"20%"}>
        <Typography fontFamily={"vazirmatn"} variant="body1">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {title}
          </Link>
        </Typography>
      </Box>
    </>
  );
};

const School = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <>
      <Paper
        square={false}
        elevation={10}
        sx={{ m: 1, height: 600 }}
        style={{
          marginTop: "3%",
          marginRight: "auto",
          marginLeft: "auto",
          maxWidth: isMobile ? "90vw" : isTablet ? "65vw" : "40vw",
          borderRadius: "10px",
        }}
      >
        <Box justifyContent={"center"} pt={"10%"} pl={"8%"}>
          <Typography fontFamily={"vazirmatn"} variant="h4">
            منابع خارجی:
          </Typography>
        </Box>
        <CostomBoxLink
          link={"https://trailofbits.github.io/ctf/"}
          title="ctf چیست؟"
        ></CostomBoxLink>
        <CostomBoxLink
          link={"https://trailofbits.github.io/ctf/"}
          title="ctf چیست؟"
        ></CostomBoxLink>
        <CostomBoxLink
          link={"https://trailofbits.github.io/ctf/"}
          title="ctf چیست؟"
        ></CostomBoxLink>
        <CostomBoxLink
          link={"https://trailofbits.github.io/ctf/"}
          title="ctf چیست؟"
        ></CostomBoxLink>
        <CostomBoxLink
          link={"https://trailofbits.github.io/ctf/"}
          title="ctf چیست؟"
        ></CostomBoxLink>
      </Paper>
    </>
  );
};

export default School;
