import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { InputTableContent } from "../pages/question";

interface Column {
  id: "id" | "hint" | "delete";
  label: string;
  Width?: string;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "شماره", Width: "5%" },
  { id: "hint", label: "هینت", Width: "90%" },
  {
    id: "delete",
    label: "حذف",
    Width: "5%",
    align: "right",
  },
];

interface CustomInputTableProps {
  rows: InputTableContent[];
  textFiled : any;
}

const CustomInputTable = ({ rows,textFiled }: CustomInputTableProps) => {
  return (
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
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.Width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => {
              return (
                <TableRow tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id !== "id" ? value : (index+1).toLocaleString("fa-EG")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomInputTable;
