import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import OrderSummmayCSS from "./OrderSummary.module.css";

// Test Data
// const cartItems = [
//   {
//     billPrice: 258,
//     desc: "Classic American cheese,Most loved one",
//     id: "B1",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
//     name: "Classic Veg with Cheese",
//     price: 129,
//     quantity: 2,
//   },
//   {
//     billPrice: 218,
//     desc: "veg patty burger,our best seller.",
//     id: "B0",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20201117120140472324_482x264jpg",
//     name: "Veg Junior",
//     price: 109,
//     quantity: 2,
//   },
//   {
//     billPrice: 258,
//     desc: "Classic American cheese,Most loved one",
//     id: "B1",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
//     name: "Classic Veg with Cheese",
//     price: 129,
//     quantity: 2,
//   },
//   {
//     billPrice: 258,
//     desc: "Classic American cheese,Most loved one",
//     id: "B1",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
//     name: "Classic Veg with Cheese",
//     price: 129,
//     quantity: 5,
//   },
//   {
//     billPrice: 258,
//     desc: "Classic American cheese,Most loved one",
//     id: "B1",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
//     name: "Classic Veg with Cheese",
//     price: 129,
//     quantity: 10,
//   },
//   {
//     billPrice: 258,
//     desc: "Classic American cheese,Most loved one",
//     id: "B1",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
//     name: "Classic Veg with Cheese",
//     price: 129,
//     quantity: 2,
//   },
//   {
//     billPrice: 258,
//     desc: "Classic American cheese,Most loved one",
//     id: "B1",
//     img: "https://burgerking-image.s3.amazonaws.com/products/PLP/web/2x_web_20210506145043080727_482x264jpg",
//     name: "Classic Veg with Cheese",
//     price: 129,
//     quantity: 23,
//   },
// ];

function SummaryItem({ itemInfo }) {
  return (
    <TableRow className={OrderSummmayCSS.summaryItemRow}>
      <TableCell className={OrderSummmayCSS.summaryItemText}>
        {itemInfo.name}
      </TableCell>
      <TableCell align="center" className={OrderSummmayCSS.summaryItemText}>
        ₹ {itemInfo.price} &times; {itemInfo.quantity}
      </TableCell>
      <TableCell align="center" className={OrderSummmayCSS.summaryItemText}>
        ₹ {itemInfo.billPrice}.00
      </TableCell>
    </TableRow>
  );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Summary() {
  const { orderDetails } = useAuth();
  return (
    <div className={OrderSummmayCSS.summaryContainer}>
      <header className={OrderSummmayCSS.summaryMainHeading}>
        Previous Order Summary
      </header>
      <TableContainer
        sx={{ maxHeight: 500 }}
        className={OrderSummmayCSS.summaryItems}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                Order ID: {orderDetails.orderID}
              </TableCell>
              <TableCell>Payment ID: {orderDetails.paymentID}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={OrderSummmayCSS.summaryHeading}
                align="left"
                style={{ width: "40%" }}
              >
                Item Name
              </TableCell>
              <TableCell
                className={OrderSummmayCSS.summaryHeading}
                align="center"
              >
                Price &times; Quantity
              </TableCell>
              <TableCell
                className={OrderSummmayCSS.summaryHeading}
                align="center"
              >
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ typography: "body1" }}>
            {orderDetails.cartItems
              ? orderDetails.cartItems.map((item) => {
                  return <SummaryItem key={item.id} itemInfo={item} />;
                })
              : null}
          </TableBody>
          <TableFooter>
            <TableCell rowSpan={4} />
            <StyledTableRow>
              <TableCell
                align={"center"}
                className={OrderSummmayCSS.summaryPriceFooter}
              >
                Subtotal
              </TableCell>
              <TableCell
                align={"right"}
                className={OrderSummmayCSS.summaryPriceFooter}
              >
                ₹ {orderDetails.billPrice ? orderDetails.billPrice : 0}.00
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell
                align={"center"}
                className={OrderSummmayCSS.summaryPriceFooter}
              >
                Tax(18%)
              </TableCell>
              <TableCell
                align={"right"}
                className={OrderSummmayCSS.summaryPriceFooter}
              >
                {orderDetails.taxPrice
                  ? orderDetails.taxPrice.toFixed(2)
                  : null}
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell
                align={"center"}
                className={OrderSummmayCSS.summaryTotalRow}
              >
                Total
              </TableCell>
              <TableCell
                align={"right"}
                className={OrderSummmayCSS.summaryTotalRow}
              >
                ₹{orderDetails.amount ? orderDetails.amount : 0}
              </TableCell>
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
