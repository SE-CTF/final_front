import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import TokenService from "../utils/tokenAccess";
import CustomAlert from "../components/alert";

interface RawDataCell {
  id: number;
  title: string;
  score: number;
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

function ChallengesAdmin() {
  const [rawDatas, setRawDatas] = React.useState<RawDataCell[]>();
  const { mode } = useAuth();

  const theme = useTheme();
  const [selectedId, setSelectedId] = useState<number>();
  const [open, setOpen] = useState(false);
  const [successAlertOpen , setSuccessAlertOpen] = useState(false)
  const [failledAlertOpen , setFailledAlertOpen] = useState(false)
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const isTablet = useMediaQuery(useTheme().breakpoints.down("md"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const columns = [
    {
      name: "اسم سوال",

      selector: (row: { title: any }) => row.title,
    },
    {
      name: "حذف",
      selector: (row: { id: any }) => row.id,
      cell: (row: { id: any | undefined }) => (
        <IconButton
          aria-label="close"
          style={{ color: "red" }}
          onClick={(e) => {
            console.log(row.id);
            setSelectedId(row.id);
            setOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
      width: isMobile ? "30%" : isTablet ? "20%" : "10%",
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setSelectedId(undefined)
  };
    const handledelete=() => 
    {
        axios
        .delete(`http://localhost:8000/api/admin/challenges/${selectedId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TokenService.getToken(),
          },
        })
        .then((response) => {
          setSuccessAlertOpen(true);
          setRawDatas(prevItems => prevItems.filter(item => item.id !== selectedId));
        })
        .catch((error) => {
          setFailledAlertOpen(true);
        }).finally(() => {
            setOpen(false)
            setSelectedId(undefined)
        })
    }
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
        setRawDatas(response.data);
        return response.data;
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginationComponentOptions = {
    noRowsPerPage: true,
    rowsPerPageText: "نفر در هر صفحه",
    rangeSeparatorText: "از",
    selectAllRowsItem: true,
    selectAllRowsItemText: "همه نتایج",
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">حدف چالش؟</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا از حذف این چالش مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handledelete}>حذف</Button>
          <Button onClick={handleClose} autoFocus>
            لغو
          </Button>
        </DialogActions>
      </Dialog>

      <CustomAlert
        open={successAlertOpen}
        setOpen={setSuccessAlertOpen}
        text={"چالش با موفقیت حذف شد."}
        severity={"success"}
        vertical={"top"}
        horizontal={"center"}
      />
      <CustomAlert
        open={failledAlertOpen}
        setOpen={setFailledAlertOpen}
        text={"حدف چالش موفقیت آمیز نبود."}
        severity={"error"}
        vertical={"top"}
        horizontal={"center"}
      />
      {rawDatas !== undefined && (
        <Paper
          square={false}
          elevation={10}
          style={{
            marginTop: "3%",
            marginRight: "auto",
            marginLeft: "auto",
            maxWidth: isMobile ? "95vw" : isTablet ? "80vw" : "60vw",
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
          ></Box>

          <DataTable
            columns={columns}
            data={rawDatas}
            customStyles={customStyles}
            theme={mode == "dark" ? "solarized" : "solarized_light"}
            persistTableHead
            pagination
            paginationComponentOptions={paginationComponentOptions}
          />
        </Paper>
      )}
    </>
  );
}

export default ChallengesAdmin;
