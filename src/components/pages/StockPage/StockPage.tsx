import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { imageUrl } from "../../../Constants";
import * as stockActions from "../../../actions/stock.action";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Stack,
  IconButton,
  Box,
  TextField,
  Fab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { Add, AddShoppingCart, AssignmentReturn, Clear, NewReleases, Search, Star } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import { Product } from "../../../types/product.type";
import { useAppDispatch } from "../../..";
import { RootReducer } from "../../../reducers";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />

      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/stock/create"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
}

const stockColumns: GridColDef[] = [
  {
    headerName: "ID",
    field: "id",
    width: 50,
  },
  {
    headerName: "IMG",
    field: "image",
    width: 80,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <img
        src={`${imageUrl}/images/${value}?dummy=${Math.random()}`}
        style={{ width: 70, height: 70, borderRadius: "5%" }}
      />
    ),
  },
  {
    headerName: "NAME",
    field: "name",
    width: 400,
  },
  {
    headerName: "STOCK",
    width: 120,
    field: "stock",
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <Typography variant="body1">
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={0}
          fixedDecimalScale={true}
        />
      </Typography>
    ),
  },
  {
    headerName: "PRICE",
    field: "price",
    width: 120,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <Typography variant="body1">
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          prefix={"฿"}
        />
      </Typography>
    ),
  },
  {
    headerName: "TIME",
    field: "createdAt",
    width: 220,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <Typography variant="body1">
        <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
      </Typography>
    ),
  },
  {
    headerName: "ACTION",
    field: ".",
    width: 120,
    renderCell: ({ row }: GridRenderCellParams<string>) => (
      <Stack direction="row">
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => {
            // navigate("/stock/edit/" + row.id);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            // setSelectedProduct(row);
            // setOpenDialog(true);
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    ),
  },
];

export default function StockPage() {

  const [rows, setRows] = React.useState([]);
  const stockReducer = useSelector((state: RootReducer) => state.stockReducer);
  const dispatch = useAppDispatch();
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);

  React.useEffect(() => {
    dispatch(stockActions.loadStockByKeyword(keywordSearch));
  }, [keywordSearch])


  React.useEffect(() => {
    dispatch(stockActions.loadStock());
  }, []);

  return (
    <Box>
      <DataGrid
        sx={{ backgroundColor: "white", height: "70vh" }}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywordSearch(e.target.value);
            },
            clearSearch: () => setKeywordSearch("")
          }
        }}
        rows={stockReducer.result}
        columns={stockColumns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}
