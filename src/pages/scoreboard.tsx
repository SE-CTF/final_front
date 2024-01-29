import DataTable, { createTheme } from "react-data-table-component";
import { Paper, useTheme, useMediaQuery } from "@mui/material";
import solarizedTheme from "../themes/react-component-table-themes";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

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

const customStyles = {
  table: {
    style: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: "96%",
    },
  },

  rows: {
    style: {
      minHeight: "72px",
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

function Scoreboard() {
  const fetchData = () => {
    axios
      .get("http://localhost:8000/api/scoreboard/")
      .then(function (response) {
        const data2 = response.data;

        if (
          Array.isArray(data2) &&
          data2.length > 0 &&
          data2[0].hasOwnProperty("score")
        ) {
          data2.sort((a, b) => b.score - a.score);

        const dataWithId = data2.map((item, index) => ({
          ...item,
          id: index + 1, 
        }));



          console.log(dataWithId);

          setData(dataWithId);
        }
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    fetchData();
  }, []);
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const { mode } = useAuth();
  const [data, setData] = useState<any>();
  const columns = [
    {
      id: 1,
      name: "رتبه",
      cell: (row: {
        id:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | null
          | undefined;
      }) => <div>{row.id?.toLocaleString("fa-EG")}</div>,
      width: isMobile ? "25%" : isTablet ? "20%" : "15%",
    },
    {
      id: 2,
      name: "نام",
      selector: (row: { username: string }) => row.username,
      width: isMobile ? "50%" : isTablet ? "60%" : "70%",
    },
    {
      id: 3,
      name: "امتیاز",
      cell: (row: {
        score:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | null
          | undefined;
      }) => <div>{row.score?.toLocaleString("fa-EG")}</div>,
      width: isMobile ? "25%" : isTablet ? "20%" : "15%",
    },
  ];
  const paginationComponentOptions = {
    noRowsPerPage: true,
    rowsPerPageText: "نفر در هر صفحه",
    rangeSeparatorText: "از",
    selectAllRowsItem: true,
    selectAllRowsItemText: "همه نتایج",
  };
  return (
    <>
      <Paper
        square={false}
        elevation={10}
        style={{
          marginTop: "3%",
          marginBottom: "3%",
          marginRight: "auto",
          marginLeft: "auto",
          maxWidth: isMobile ? "95vw" : isTablet ? "85vw" : "80vw",
          borderRadius: "10px",
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          theme={mode == "dark" ? "solarized" : "solarized_light"}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </Paper>
    </>
  );
}

export default Scoreboard;
