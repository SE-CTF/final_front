import {
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  Box,
  IconButton,
  DialogContent,
} from "@mui/material";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import SetDifficultyAndCategoryAccordian from "./setdifficultyaccordian";

interface FilterDialogProps {
  open: boolean;
  handleclose: () => void;
  handlDiffChange: Function;
  handleCategory: Function;
  sliderValue: number[];
  handleSliderChange: Function;
}

const FilterDialog = ({
  open,
  handleclose,
  handlDiffChange,
  handleCategory,
  sliderValue,
  handleSliderChange,
}: FilterDialogProps) => {
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleclose}
        fullScreen={true}
      >
        <DialogTitle mt={"2%"}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              {" "}
              <Typography variant="h5">{"فیلتر ها"}</Typography>
            </Grid>
            <Grid item>
              <>
                <Box display={"flex"}>
                  <IconButton
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                    color="info"
                    aria-label="delete"
                    onClick={handleclose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <SetDifficultyAndCategoryAccordian
            handleItemChange={handlDiffChange}
            title={"سختی"}
            items={["آسان", "متوسط", "سخت"]}
            isSlider={false}
          />
          <SetDifficultyAndCategoryAccordian
            handleItemChange={() => {}}
            title={"دسته بندی"}
            items={[
              "Crypto",
              "Cracking",
              "Network",
              "Forensics",
              "Steganography",
            ]}
            isSlider={false}
          />
          <SetDifficultyAndCategoryAccordian
            title={"امتیاز"}
            isSlider={true}
            sliderValue={sliderValue}
            handleSliderChange={handleSliderChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterDialog;
