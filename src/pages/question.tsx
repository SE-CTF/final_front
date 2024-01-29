import React, { ReactElement, useState } from "react";
import { set, useForm } from "react-hook-form";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ZodError, z } from "zod";
import CustomTextField from "../components/customtextfield";
import CreateIcon from "@mui/icons-material/Create";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CustomButton from "../components/custombutton";
import SaveIcon from "@mui/icons-material/Save";
import FlagIcon from "@mui/icons-material/Flag";
import { useAuth } from "../context/AuthContext";
import CustomTagChip from "../components/CustomTagChip";
import axios from "axios";
import TokenService from "../utils/tokenAccess";
import CustomAlert from "../components/alert";

interface FormData {
  challangeName: string;
  Category: "crypto" | "Cracking" | "Network" | "Forensics" | "Steganography";
  score: number;
  hint1: string;
  hint2: string;
  hint3: string;
  challangeFlag: string;
  desc: string;
}

const formDataSchema = z.object({
  challangeName: z.string().min(5),
  challangeFlag: z.string().min(8),
  score: z.coerce.number().int().gte(0).lte(101),
});

interface Errors {
  challangeFlagError: string;
  challangeNameError: string;
  scoreError: string;
}

interface Hint {
  description: string;
}

interface ToSend {
  title: string;
  description: string;
  score: number;
  flag: string;
  category: string;
  hints: Hint[];
}

const mkdStr = `
# !!!بزگترین جامعه حق طلبان 

---



\`\`\`python

print("hello world")

\`\`\`
`;

export interface InputTableContent {
  id: number;
  hint: ReactElement;
  delete: ReactElement;
  index: number;
}
function Question() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const [value, setValue] = React.useState(mkdStr);
  const [score, setScore] = React.useState(100);
  const { register, handleSubmit } = useForm<FormData>();
  const { mode } = useAuth();
  const [category, setCategory] = React.useState("crypto");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [secondAlertOpen, setSecondAlertOpen] = React.useState(false);
  const [errors, setErrors] = useState<Errors>({
    challangeFlagError: "",
    challangeNameError: "",
    scoreError: "",
  });

  const initialErrors = {
    challangeFlagError: "",
    challangeNameError: "",
    scoreError: "",
  };

  const resetErrors = () => {
    setErrors(initialErrors);
  };
  const updateError = (propertyName: string, newValue: string) => {
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [propertyName]: newValue,
    }));
  };

  const handleScoreChange = (event: {
    target: { value: string | React.SetStateAction<number> };
  }) => {
    if (event.target.value == "") {
      setScore(0);
      return;
    }
    if (Number.isNaN(parseInt(event.target.value, 10))) return;
    if (parseInt(event.target.value, 10) <= 100) {
      setScore(event.target.value);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const onSubmit = (data: FormData) => {
    resetErrors();
    try {
      const validatedData = formDataSchema.parse(data);

      data.desc = value;

      const dataToSend: ToSend = {
        title: data.challangeName,
        description: data.desc,
        score: data.score,
        flag: data.challangeFlag,
        category: data.Category,
        hints: [],
      };
      if (data.hint1 != "") {
        const hint: Hint = {
          description: data.hint1,
        };
        dataToSend.hints.push(hint);
      }
      if (data.hint2 != "") {
        const hint2: Hint = {
          description: data.hint2,
        };
        dataToSend.hints.push(hint2);
      }
      if (data.hint3 != "") {
        const hint3: Hint = {
          description: data.hint3,
        };
        dataToSend.hints.push(hint3);
      }
      console.log(dataToSend);

      axios
        .post("http://localhost:8000/api/admin/challenges/", dataToSend, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TokenService.getToken(),
          },
        })
        .then((response) => {
          console.log(response);
          setSecondAlertOpen(true);
        })
        .catch((error) => {
          console.log(error);
          setAlertOpen(true);
        });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Form data validation failed:", error.errors);
        error.errors.forEach(
          (validationError: { code: string; path: any[]; message: any }) => {
            if (validationError.path[0] == "challangeFlag") {
              updateError(
                "challangeNameError",
                "نام سوال باید حداقل ۵ حرف باشد."
              );
            }
            if (validationError.path[0] == "challangeName") {
              updateError(
                "challangeFlagError",
                "جواب سوال حداقل باید ۸ حرف باشد."
              );
            }
            if (validationError.path[0] == "score") {
              updateError("scoreError", "امتیاز باید بین ۰ تا ۱۰۰ باشد.");
            }
          }
        );
      } else {
        console.error("An unexpected error occurred during validation:", error);
      }
    }
  };
  return (
    <>
      <CustomAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        text={"اضافه کردن چالش موفقیت آمیز نبود."}
        severity={"error"}
        vertical={"top"}
        horizontal={"center"}
      />
      <CustomAlert
        open={secondAlertOpen}
        setOpen={setSecondAlertOpen}
        text={"چالش با موفقیت اضافه شد."}
        severity={"success"}
        vertical={"top"}
        horizontal={"center"}
      />
      <Paper
        square={false}
        elevation={10}
        sx={{ minHeight: 550 }}
        style={{
          marginTop: "3%",
          marginBottom: "3%",
          marginRight: "auto",
          marginLeft: "auto",
          maxWidth: isMobile ? "95vw" : isTablet ? "90vw" : "85vw",
          borderRadius: "10px",
          padding: "2%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            width={isMobile ? "95%" : isTablet ? "90%" : "80%"}
            m={isMobile ? "7% 2%" : isTablet ? "4% 5%" : " 2% 10%"}
          >
            <CustomTextField
              id={"challangeName"}
              type={"text"}
              placeholder={"نام سوال"}
              label={"نام سوال"}
              variant={"outlined"}
              fullWidth={true}
              name={"challangeName"}
              register={register}
              icon={<CreateIcon />}
              helperText={errors.challangeFlagError}
            />
          </Box>
          <Box
            width={isMobile ? "95%" : isTablet ? "90%" : "80%"}
            m={isMobile ? "7% 2%" : isTablet ? "4% 5%" : " 2% 10%"}
          >
            <CustomTextField
              id={"challangeFlag"}
              type={"text"}
              placeholder={"فلگ سوال"}
              label={"فلگ سوال"}
              variant={"outlined"}
              fullWidth={true}
              name={"challangeFlag"}
              register={register}
              icon={<FlagIcon />}
              helperText={errors.challangeNameError}
            />
          </Box>
          <Box
            width={isMobile ? "95%" : isTablet ? "90%" : "80%"}
            m={isMobile ? "7% 2%" : isTablet ? "4% 5%" : " 2% 10%"}
          >
            <Grid container>
              <Grid xs={12} md={5}>
                <CustomTextField
                  id={"score"}
                  type={"text"}
                  value={score.toString()}
                  onChange={handleScoreChange}
                  placeholder={"امتیاز "}
                  label={"امتیاز سوال"}
                  variant={"outlined"}
                  fullWidth={true}
                  name={"score"}
                  register={register}
                  icon={<CreditScoreIcon />}
                  helperText={errors.scoreError}
                />
              </Grid>
              <Grid xs={0} md={2}></Grid>

              <Grid
                xs={12}
                md={5}
                mt={isMobile ? "7%" : isTablet ? "4%" : " 0%"}
              >
                <FormControl sx={{ minWidth: "100%" }} size="medium">
                  <InputLabel id="demo-select-small-label">
                    دسته بندی
                  </InputLabel>
                  <Select
                    {...register("Category")}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="دسته بندی"
                    sx={{ borderRadius: "8px" }}
                    value={category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"crypto"}>
                      <CustomTagChip text="crypto" />
                    </MenuItem>
                    <MenuItem value={"Cracking"}>
                      <CustomTagChip text="Cracking" />
                    </MenuItem>
                    <MenuItem value={"Network"}>
                      <CustomTagChip text="Network" />
                    </MenuItem>
                    <MenuItem value={"Forensics"}>
                      <CustomTagChip text="Forensics" />
                    </MenuItem>
                    <MenuItem value={"Steganography"}>
                      <CustomTagChip text="Steganography" />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box
            width={isMobile ? "95%" : isTablet ? "90%" : "88%"}
            m={isMobile ? "7% 2%" : isTablet ? "4% 5%" : " 2% 5%"}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "5%" }}>{"شماره"}</TableCell>
                      <TableCell style={{ width: "95%" }}>
                        {"راهنمایی"}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow tabIndex={-1}>
                      <TableCell>{"۱"}</TableCell>
                      <TableCell>
                        <CustomTextField
                          name={"hint1"}
                          register={register}
                          id={""}
                          type={"text"}
                          placeholder={"راهنمایی"}
                          label={"راهنمایی"}
                          variant={"outlined"}
                          fullWidth
                        ></CustomTextField>
                      </TableCell>
                    </TableRow>
                    <TableRow tabIndex={-1}>
                      <TableCell>{"۲"}</TableCell>
                      <TableCell>
                        <CustomTextField
                          name={"hint2"}
                          register={register}
                          id={""}
                          type={"text"}
                          placeholder={"راهنمایی"}
                          label={"راهنمایی"}
                          variant={"outlined"}
                          fullWidth
                        ></CustomTextField>
                      </TableCell>
                    </TableRow>
                    <TableRow tabIndex={-1}>
                      <TableCell>{"۳"}</TableCell>
                      <TableCell>
                        <CustomTextField
                          name={"hint3"}
                          register={register}
                          id={""}
                          type={"text"}
                          placeholder={"راهنمایی"}
                          label={"راهنمایی"}
                          variant={"outlined"}
                          fullWidth
                        ></CustomTextField>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Divider />
          <div data-color-mode={mode}>
            <div
              style={{ height: "80%", marginTop: "3%" }}
              className="wmde-markdown-var"
              dir="ltr"
            >
              <MDEditor height={"100%"} value={value} onChange={setValue} />
            </div>
          </div>
          <Box
            width={isMobile ? "70%" : isTablet ? "40%" : "14%"}
            m={isMobile ? "7% 15%" : isTablet ? "4% 30%" : " 2% 44%"}
            justifyContent={"center"}
          >
            <CustomButton
              buttonText={"دخیره کردن چالش"}
              fullWidth={true}
              color={"success"}
              typoGraphyVariant={"body1"}
              icon={<SaveIcon />}
              type={"submit"}
            />
          </Box>
        </form>
      </Paper>
    </>
  );
}

export default Question;
