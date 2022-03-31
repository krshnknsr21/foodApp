import { useAuth } from "../../contexts/AuthContext";
import { Fab, Paper, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CartItemCSS from "./CartItem.module.css";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FloatingActionButtons({ itemInfo }) {
  const { dispatch, ACTIONS } = useAuth();

  return (
    <StyledTableRow key={itemInfo.name} className={CartItemCSS.itemRow}>
      <TableCell component="th" scope="row" className={CartItemCSS.itemText}>
        {itemInfo.name}
      </TableCell>
      <TableCell align="center" className={CartItemCSS.itemText}>
        ₹{itemInfo.price}.00
      </TableCell>
      <TableCell align="center">
        <Paper className={CartItemCSS.quantityControls}>
          <Fab
            aria-label="remove 1 from quantity"
            className={CartItemCSS.editQuantityButton}
            onClick={() => {
              dispatch({
                type: ACTIONS.DECREASE_ITEM_QUANTITY,
                payload: { id: itemInfo.id },
              });
              // updateCartItems();
            }}
          >
            <RemoveIcon />
          </Fab>
          <span className={CartItemCSS.cartItemCountText}>
            {itemInfo.quantity}
          </span>
          <Fab
            aria-label="add 1 to quantity"
            className={CartItemCSS.editQuantityButton}
            onClick={() => {
              dispatch({
                type: ACTIONS.INCREASE_ITEM_QUANTITY,
                payload: { id: itemInfo.id },
              });
              // updateCartItems();
            }}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </TableCell>
      <TableCell className={CartItemCSS.itemText} align="center">
        ₹{itemInfo.billPrice}.00
      </TableCell>
      <TableCell align="center">
        <Fab
          aria-label="delete item"
          className={CartItemCSS.deleteItemButton}
          onClick={() => {
            dispatch({
              type: ACTIONS.DELETE_ITEM,
              payload: { id: itemInfo.id },
            });
            // updateCartItems();
          }}
        >
          <DeleteIcon />
        </Fab>
      </TableCell>
    </StyledTableRow>
  );
}
