import React, { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DialogComponent from "../components/dialoges";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Hidden,
  Paper,
  Rating,
  TextField,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import SetDifficultyAndCategoryAccordian from "../components/setdifficultyaccordian";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CustomTextField from "../components/customtextfield";
import FilterDialog from "../components/filterdialog";
import SearchIcon from "@mui/icons-material/Search";
import CustomTagChip from "../components/CustomTagChip";

interface RawDataCell {
  id: number;
  title: string;
  score: number;
  category: string;
}

interface DataCell {
  id: number;
  title: string;
  diff: string;
  score: number;
  category: string;
  solved: boolean;
  rating: number;
  scoreToShow: string;
}
interface selectedCellType {
  title: string;
  description: string;
  score: number;
  hints: string[];
  category: string;
}

const customStyles = {
  table: {
    style: {
      fontFamily: "vazirmatn",
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: "96%",
    },
  },

  rows: {
    style: {
      minHeight: "72px",
      cursor: "pointer",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};
const columns = [
  {
    name: "اسم سوال",

    selector: (row: { title: any }) => row.title,
  },
  {
    name: "سختی",
    selector: (row: { diff: any }) => row.diff,
    conditionalCellStyles: [
      {
        when: (row: { diff: string }) => row.diff == "آسان",
        style: {
          color: "rgba(63, 195, 128, 0.9)",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row: { diff: string }) => row.diff == "متوسط",
        style: {
          color: "rgba(208, 258, 6, 0.9)",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row: { diff: string }) => row.diff == "سخت",
        style: {
          color: "rgba(242, 38, 19, 0.9)",
          "&:hover": {
            cursor: "not-allowed",
          },
        },
      },
    ],
  },
  {
    name: "امتیاز",
    selector: (row: { scoreToShow: any }) => row.scoreToShow,
  },
  {
    name: "دسته بندی",
    selector: (row: { category: any }) => row.category,
    cell: (row: { category: any | undefined }) => (
      <CustomTagChip text={row.category} />
    ),
  },
];

const FilterComponent = ({ filterText, onFilter }) => (
  <div>
    <CustomTextField
      id={"search"}
      type={"search"}
      placeholder={"فیلتر کردن با اسم"}
      label={"جست و جو"}
      variant={"outlined"}
      fullWidth={true}
      value={filterText}
      onChange={onFilter}
      icon={<SearchIcon />}
    />
  </div>
);
function QuickFilteringGrid() {
  const [filterText, setFilterText] = React.useState("");
  const [filterDifficulty, setFilterDifficulty] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState("");
  const [solved, setSolved] = React.useState(false);
  const [first, setFirst] = React.useState(false);
  const [rawDatas, setRawDatas] = React.useState<RawDataCell[]>();
  const { mode } = useAuth();
  const [sliderValue, setSliderValue] = React.useState<number[]>([0, 100]);
  const [rowId, setRowId] = React.useState<number>(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [processedData, setProcessedData] = React.useState<
    DataCell[] | undefined
  >(undefined);

  const [selectedCell, setSelectedCell] = React.useState<
    selectedCellType | undefined
  >(undefined);
  createTheme(
    "solarized",
    {
      text: {
        fontFamily: "vazirmatn",
        primary: "white",
        secondary: "#2aa198",
      },
      background: {
        default: "transparent",
      },
      context: {
        background: "#cb4b16",
        text: "primary",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );
  createTheme(
    "solarized_light",
    {
      text: {
        fontFamily: "vazirmatn",
        primary: "black",
        secondary: "#2aa198",
      },
      background: {
        default: "transparent",
      },
      context: {
        background: "#cb4b16",
        text: "primary",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "light"
  );
  const fetchData = () => {
    axios
      .get("http://localhost:8000/api/challenges/")
      .then(function (response) {
        console.log(response.data);
        setRawDatas(response.data);
        return response.data;
      })
      .catch(function (error) {
      });
  };

  const rawDataProcess = (rawDataCells: RawDataCell[]) => {
    const processedDatas: DataCell[] = rawDataCells.map((cell, index) => {
      console.log(cell);
      
      const processedData: DataCell = {
        id: cell.id,
        title: cell.title,
        diff: cell.score < 30 ? "آسان" : cell.score < 60 ? "متوسط" : "سخت",
        score: cell.score,
        category: cell.category,
        solved: false,
        rating: 2,
        scoreToShow: cell.score.toLocaleString("fa-EG"),
      };

      return processedData;
    });

    setProcessedData(processedDatas);

    return processedDatas;
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (rawDatas !== undefined && !first) {
      setFirst(true);

      rawDataProcess(rawDatas);
    }
  }, [rawDatas]);
  const filteredItems = processedData?.filter((item) =>
    filterDifficulty.length > 0
      ? item.title &&
        item.title.includes(filterText) &&
        item.diff &&
        filterDifficulty.includes(item.diff) &&
        item.score <= sliderValue[1] &&
        item.score >= sliderValue[0]
      : item.title &&
        item.title.includes(filterText) &&
        item.score <= sliderValue[1] &&
        item.score >= sliderValue[0]
  );
  const handleclose = () => {
    setOpen(false);
  };
  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };
  const handleClick = (row: {
    title: React.SetStateAction<string>;
    solved: boolean | ((prevState: boolean) => boolean);
  }) => {
    const id = row.id ;

    axios
      .get(`http://localhost:8000/api/challenges/${id}/`)
      .then(function (response) {

        setSelectedCell(response.data);
      })
      .catch(function (error) {
      });
    setSelectedTitle(row.title);
    setSolved(row.solved);
    setRowId(id);
    setOpen((prevOpen) => {
      return true;
    });
  };

  const paginationComponentOptions = {
    noRowsPerPage: true,
    rowsPerPageText: "نفر در هر صفحه",
    rangeSeparatorText: "از",
    selectAllRowsItem: true,
    selectAllRowsItemText: "همه نتایج",
  };

  const handlDiffChange = (e: { target: { name: string } }) => {
    if (!filterDifficulty.includes(e.target.name)) {
      setFilterDifficulty((prevFilterDifficulty) => [
        ...prevFilterDifficulty,
        e.target.name,
      ]);
    } else {
      setFilterDifficulty((prevFilterDifficulty) =>
        prevFilterDifficulty.filter((item) => item !== e.target.name)
      );
    }
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < 5) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - 5);
        setSliderValue([clamped, clamped + 5]);
      } else {
        const clamped = Math.max(newValue[1], 5);
        setSliderValue([clamped - 5, clamped]);
      }
    } else {
      setSliderValue(newValue as number[]);
    }
  };
  return (
    <>
      <Grid container>
        <Hidden smDown>
          <Grid sm={3} xs={0}>
            {" "}
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
                "crypto",
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
          </Grid>
        </Hidden>
        <Grid sm={9} xs={12}>
          {processedData !== undefined && (
            <Paper
              square={false}
              elevation={10}
              style={{
                marginTop: "3%",
                marginRight: "auto",
                marginLeft: "auto",
                maxWidth: "95%",
                borderRadius: "10px",
                paddingTop: "1%",
              }}
            >
              <Box
                maxWidth={!isMobile ? "85%" : "100%"}
                justifyContent={"center"}
                margin={"auto"}
                bgcolor={"transparent"}
                p={"2% 3%"}
              >
                <FilterComponent
                  onFilter={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setFilterText(e.target.value)}
                  filterText={filterText}
                />
              </Box>
              <Hidden smUp>
                <Box
                  maxWidth={"100%"}
                  p={"3%"}
                  justifyContent={"center"}
                  margin={"auto"}
                >
                  <Button
                    variant="contained"
                    elevation={300}
                    style={{ background: "transparent", color: "inherit" }}
                    fullWidth
                    startIcon={<FilterAltIcon />}
                    onClick={() => {
                      setFilterDialogOpen(true);
                    }}
                  >
                    فیلترها
                  </Button>
                </Box>
              </Hidden>

              <DataTable
                columns={columns}
                data={filteredItems}
                customStyles={customStyles}
                theme={mode == "dark" ? "solarized" : "solarized_light"}
                onRowClicked={handleClick}
                persistTableHead
                pagination
                paginationComponentOptions={paginationComponentOptions}
              />
            </Paper>
          )}
          {processedData == undefined && (
            <Box
              mt={"20%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress color="primary" size={"10rem"} />
            </Box>
          )}
          {selectedCell !== undefined && (
            <DialogComponent
              open={open}
              handleclose={handleclose}
              title={selectedCell?.title}
              solved={false}
              score={selectedCell?.score}
              description={selectedCell?.description}
              category={selectedCell?.category}
              hints={selectedCell?.hints}
              id={rowId}
              fullScreen={fullScreen}
            />
          )}
          <FilterDialog
            open={filterDialogOpen}
            handleclose={handleFilterDialogClose}
            handlDiffChange={handlDiffChange}
            handleCategory={() => {}}
            sliderValue={sliderValue}
            handleSliderChange={handleSliderChange}
          ></FilterDialog>
        </Grid>
      </Grid>
    </>
  );
}

export default QuickFilteringGrid;
