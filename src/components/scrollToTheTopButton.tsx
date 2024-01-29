import { useScrollTrigger, Fade, Box } from "@mui/material";

interface Props {
  children: React.ReactElement;
}

const ScrollTop = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export default ScrollTop;
