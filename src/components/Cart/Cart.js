import { useEffect } from "react";
import { db } from "../../firebase";
import { setDoc, updateDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CartItem from "./CartItem.js";
import { useAuth } from "../../contexts/AuthContext";
import CartCSS from "./Cart.module.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function EmptyCart() {
  return (
    <div className={CartCSS.emptyCart}>
      <Box fontSize="h3.fontSize" fontWeight="fontWeightBold">
        Your cart is empty
      </Box>
      <Box fontSize="h5.fontSize" fontWeight="fontWeightBold">
        Please add some items to your cart
      </Box>
      <Link to="/menu" className={CartCSS.emptyCartButton}>
        Go To Menu
      </Link>
    </div>
  );
}

export default function Cart() {
  const {
    state,
    dispatch,
    setBillPrice,
    getUserDetails,
    userDetails,
    currentUser,
    ACTIONS,
  } = useAuth();

  useEffect(() => {
    getUserDetails();
    console.log("Cart");
  }, []);

  async function addOrder(orderDetails) {
    const userDoc = doc(db, "users", currentUser.uid);
    await setDoc(doc(db, "order", orderDetails.orderID), orderDetails);
    await updateDoc(userDoc, { previousOrderID: orderDetails.orderID });
    dispatch({ type: ACTIONS.RESET_CART });
  }

  async function updateAmount() {
    await fetch("http://localhost:1337/getAmount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: currentUser.uid }),
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: currentUser.uid }),
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? process.env.RAZORPAY_KEY_ID : "PRODUCTION_KEY",
      currency: data.currency,
      amount: ((state.totalPrice + state.taxPrice) * 100).toFixed(0).toString(),
      order_id: data.id,
      name: "Order Payment",
      description: "Choose your payment method",
      // image: "../../images/logo1.png",
      handler: function (response) {
        const orderDetails = {
          orderID: response.razorpay_order_id,
          paymentID: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          userID: currentUser.uid,
          amount: Number((state.totalPrice + state.taxPrice).toFixed(2)),
          cartItems: state.cartItems,
          taxPrice: Number(state.taxPrice.toFixed(2)),
          billPrice: Number(state.totalPrice),
        };

        addOrder(orderDetails);
        console.log("Payment successfull!!");
      },
      prefill: {
        name: userDetails.name,
        email: currentUser.email,
        contact: userDetails.num.toString(),
      },
    };
    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  }

  return (
    <>
      {state.cartCount ? (
        <>
          <h1 className={CartCSS.cartMainHeading}>Your Cart</h1>
          <div className={CartCSS.cartContainer}>
            <TableContainer
              sx={{ maxHeight: 500 }}
              className={CartCSS.cartItems}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={CartCSS.cartHeading} align="left">
                      Item Name
                    </TableCell>
                    <TableCell className={CartCSS.cartHeading} align="center">
                      Price
                    </TableCell>
                    <TableCell className={CartCSS.cartHeading} align="center">
                      Quantity
                    </TableCell>
                    <TableCell className={CartCSS.cartHeading} align="center">
                      Total Price
                    </TableCell>
                    <TableCell
                      className={CartCSS.cartHeading}
                      align="center"
                      sx={{ minWidth: 10, maxWidth: 10 }}
                    >
                      {" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ typography: "body1" }}>
                  {state.cartItems.map((item) => {
                    return (
                      <CartItem
                        key={item.id}
                        itemInfo={item}
                        dispatch={dispatch}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Separator for bill and cart*/}
            <TableContainer
              sx={{ maxHeight: 500 }}
              className={CartCSS.billDetails}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={CartCSS.billTitle}
                      align="center"
                      colSpan={2}
                    >
                      <Typography variant="h5" component="h5">
                        Bill Details
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={CartCSS.billPrice}>
                    <TableCell align="left">Price before tax</TableCell>
                    <TableCell align="right">₹{state.totalPrice}</TableCell>
                  </TableRow>
                  <TableRow className={CartCSS.billTax}>
                    <TableCell align="left">Tax (18%)</TableCell>
                    <TableCell align="right">
                      {state.taxPrice.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={CartCSS.billTotal} align="center">
                      Total
                    </TableCell>
                    <TableCell className={CartCSS.billTotal} align="center">
                      ₹{(state.totalPrice + state.taxPrice).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={CartCSS.paymentButtonContainer}
                      colSpan={2}
                      align="center"
                    >
                      <Button
                        className={CartCSS.paymentButton}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setBillPrice(
                            (state.totalPrice + state.taxPrice).toFixed(2)
                          );
                          updateAmount();
                          // setTimeout(() => {
                          //   displayRazorpay();
                          // }, 1000);
                        }}
                      >
                        <Typography variant="h6">
                          PAY ₹{(state.totalPrice + state.taxPrice).toFixed(2)}
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
