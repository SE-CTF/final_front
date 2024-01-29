import {
  Accordion,
  AccordionSummary,
  Typography,
  Divider,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

interface SetDifficultyAndCategoryAccordianProps {
  handleItemChange?: (e: any) => void;
  title: string;
  items?: string[];
  isSlider: boolean;
  sliderValue?:number[];
  handleSliderChange?: Function;
}



const SetDifficultyAndCategoryAccordian = ({
  handleItemChange,
  title,
  items,
  isSlider,
  sliderValue,
  handleSliderChange
}: SetDifficultyAndCategoryAccordianProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleCheckBoxChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Accordion
        elevation={10}
        expanded={expanded === "panel4"}
        onChange={handleCheckBoxChange("panel4")}
        style={{
          width: "80%",
          border: "none",
          margin: "auto",
          marginTop: "10%",
          borderRadius: "10px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography  sx={{ width: "33%", flexShrink: 0 }}>
            {title}
          </Typography>
        </AccordionSummary>
        <Divider></Divider>
        <AccordionDetails>
          {!isSlider && (
            <FormGroup>
              {items.map((value) => (
                <>
                  <FormControlLabel
                    control={<Checkbox name={value} />}
                    label={value}
                    onChange={handleItemChange}
                  />
                </>
              ))}
            </FormGroup>
          )}
          {isSlider && (
            
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              disableSwap
            />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SetDifficultyAndCategoryAccordian;
