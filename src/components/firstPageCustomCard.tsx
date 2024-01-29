import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Backdrop,
} from "@mui/material";

import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

interface FirstPageCustomCardProps {
  cardTitle: string;
  cardText: string;
  cardImageSource: string;
  cardImageAlt: string;
  isNotMobile: boolean;
  link:string;
}

const FirstPageCustomCard = ({
  cardTitle,
  cardText,
  cardImageSource,
  cardImageAlt,
  isNotMobile,
  link
}: FirstPageCustomCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <>
      <Box>
        <Link to={link}>
          <Card
            elevation={20}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardActionArea>
              <>
                <CardMedia
                  component="img"
                  height="140"
                  src={cardImageSource}
                  alt={cardImageAlt}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {cardTitle}
                  </Typography>
                  <Typography variant="subtitle1">{cardText}</Typography>
                </CardContent>
              </>
            </CardActionArea>
          </Card>
        </Link>
      </Box>
    </>
  );
};

export default FirstPageCustomCard;
