import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { updateDoc, setDoc, doc } from "firebase/firestore";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Backdrop, CircularProgress } from "@mui/material";
import OrderSummary from "./OrderSummary.js";
import UserProfileCSS from "./UserProfile.module.css";

function UserProfile() {
  const {
    currentUser,
    userDetails,
    getUserDetails,
    orderDetails,
    switchToggle,
    logout,
  } = useAuth();
  const userName = useRef(userDetails.name);
  const userNum = useRef(userDetails.num);
  const userAddress = useRef(userDetails.address);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [viewOnly, setViewOnly] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserDetails();
    switchToggle();
  }, []);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function handleCancel() {
    userName.current.value = userDetails.name;
    userNum.current.value = userDetails.num;
    userAddress.current.value = userDetails.address;
  }

  const checkFields = () => {
    setErrors({});
    const phoneRegEx = /[6789]{1}[0-9]{9}/;
    if (userName.current.value === "") {
      setErrors((prevState) => {
        return { ...prevState, name: "Name is required !" };
      });
      return false;
    } else if (userNum.current.value === "") {
      setErrors((prevState) => {
        return { ...prevState, num: "Phone number cannot be blank !" };
      });
      return false;
    } else if (!userNum.current.value.match(phoneRegEx)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          num: "Enter Valid Mobile number with 6-9 and remaing 9 digit with 0-9 !",
        };
      });
      return false;
    } else if (userAddress.current.value === "") {
      setErrors((prevState) => {
        return { ...prevState, address: "Address is required !" };
      });
      return false;
    } else {
      return true;
    }
  };

  const userDoc = doc(db, "users", currentUser.uid);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (checkFields()) {
        setError("");
        setLoading(true);
        const newfields = {
          name: userName.current.value,
          num: Number(userNum.current.value),
          address: userAddress.current.value,
        };
        await updateDoc(userDoc, newfields);
        getUserDetails();
        setViewOnly(true);
        history.push("/profile");
      } else {
        console.log(errors);
        return;
      }
    } catch {
      setError("Failed to Update Profile");
    }
    setLoading(false);
  }

  const handleToggle = () => {
    if (orderDetails.userID) {
      setOpen(!open);
    } else {
      setError(orderDetails.orderID);
      console.log("details: ", orderDetails.orderID);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={UserProfileCSS.profileContainer}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className={UserProfileCSS.profileCard} style={{ width: "600px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Your Profile</h2>
          <Form>
            <Form.Group id="name">
              <Form.Label className={UserProfileCSS.userProfileFormLabel}>
                Name
              </Form.Label>
              <Form.Control
                ref={userName}
                type="text"
                defaultValue={userDetails.name}
                className={UserProfileCSS.edit}
                disabled={viewOnly}
                required
                isInvalid={!!errors.name}
                title="Enter your name"
                onChange={(event) => {
                  userName.current.value = event.target.value;
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{
                  color: "black",
                }}
                className={UserProfileCSS.formError}
              >
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="email">
              <Form.Label className={UserProfileCSS.userProfileFormLabel}>
                Email
              </Form.Label>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                disabled
              />
            </Form.Group>
            <Form.Group id="number">
              <Form.Label className={UserProfileCSS.userProfileFormLabel}>
                Number
              </Form.Label>
              <Form.Control
                ref={userNum}
                type="text"
                required
                isInvalid={!!errors.num}
                className={UserProfileCSS.edit}
                defaultValue={userDetails.num}
                disabled={viewOnly}
                onChange={(event) => {
                  userNum.current.value = event.target.value;
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{
                  color: "black",
                }}
                className={UserProfileCSS.formError}
              >
                {errors.num}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="address">
              <Form.Label className={UserProfileCSS.userProfileFormLabel}>
                Address
              </Form.Label>
              <Form.Control
                ref={userAddress}
                className={UserProfileCSS.edit}
                type="text"
                isInvalid={!!errors.address}
                defaultValue={userDetails.address}
                disabled={viewOnly}
                required
                onChange={(event) => {
                  userAddress.current.value = event.target.value;
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{
                  color: "black",
                }}
                className={UserProfileCSS.formError}
              >
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            {viewOnly ? (
              <div className={UserProfileCSS.profileButtons}>
                <Button
                  disabled={loading}
                  variant="secondary"
                  onClick={() => {
                    setViewOnly(false);
                  }}
                >
                  Edit Profile
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className={UserProfileCSS.profileButtons}>
                <Button disabled={loading} onClick={handleSubmit}>
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setViewOnly(true);
                    handleCancel();
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Form>
          <Button onClick={handleToggle} className="w-100">
            Show Previous Order
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            {loading && <CircularProgress color="inherit" />}
            <OrderSummary />
          </Backdrop>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;
