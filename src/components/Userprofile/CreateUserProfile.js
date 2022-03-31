import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Card, Button, Alert, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import CreateUserProfileCSS from "./CreateUserProfile.module.css";

function CreateUserProfile() {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const { currentUser } = useAuth();
  const [userNum, setUserNum] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const Branch = [
    {
      Name: "Thane",
      Address:
        "Plot 23, Ground Floor, Gokhale Rd, Wadhavicar Wadi, Bhav Baug, Thane, Maharashtra 400602",
      contact: "9982012501",
    },
    {
      Name: "Mulund",
      Address:
        "SHOP NO- 17 & 18A WIND, HALLMARK, VASANT OSCAR, LBS MARG,MULUND WEST, MUMBAI - 400080 ",
      contact: "9982012502",
    },
    {
      Name: "Kurla",
      Address:
        "Kanakia Zillion, Shop No 2, Ground, Lal Bahadur Shastri Rd, Kurla West, Mumbai, Maharashtra 400070",
      contact: "9982012503",
    },
    {
      Name: "Sion",
      Address:
        " SN 09, Plot No 1A, Basant Court CHS Ltd Sion, opposite Sion Railway, Station, Mumbai, Maharashtra 400603",
      contact: "9982012504",
    },
    {
      Name: "Dadar",
      Address:
        "Star Mall, N C. Kelkar Rd, Dadar West, Dadar, Mumbai, Maharashtra 400028",
      contact: "9982012505",
    },
    {
      Name: "Ghatkopar",
      Address:
        "R Odeon Mall, Unit No. 4 & 5, Plot No.194 A, Ghatkopar East, Mumbai, Maharashtra 400077",
      contact: "9982012506",
    },
    {
      Name: "Chembur",
      Address:
        "Unit No 7/11 to 14, 3rd Floor Food Court, Chembur, near Diamond Garden, Circle, Mumbai, Maharashtra 400071",
      contact: "9982012507",
    },
    {
      Name: "Vikhroli",
      Address:
        "Shop No 1, JK Tower, Phirojshah Nagar, 2, 3, Sai Pooja Rd, Vikhroli, Mumbai, Maharashtra 400083",
      contact: "9982012508",
    },
    {
      Name: "Bandra",
      Address:
        "Shop No.1, Bhall Villa, Rinkle CHS Limited, St John Baptist Rd, Bandra West, Mumbai, Maharashtra 400050",
      contact: "9982012509",
    },
  ];

  async function setUserDetails() {
    await setDoc(doc(db, "users", currentUser.uid), {
      name: userName,
      num: Number(userNum),
      address: userAddress,
      branch: userBranch,
      cartItems: [],
      cartCount: 0,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (userBranch) {
        await setUserDetails();
        history.push("/");
      } else {
        setError("Please select a branch");
      }
    } catch {
      setError("Failed to create Profile");
    }

    setLoading(false);
  }

  return (
    <div className={CreateUserProfileCSS.createProfileContainer}>
      <Card className={CreateUserProfileCSS.createProfileCard}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group
              id="Name"
              className={CreateUserProfileCSS.userProfileGroup}
            >
              <Form.Label>Full Name</Form.Label>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                className="form-control"
                id="nameImput"
                placeholder="Name"
                required
                title="Enter your name"
              />
            </Form.Group>
            <Form.Group className={CreateUserProfileCSS.userProfileGroup}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {userBranch ? userBranch : "Select Branch"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Branch.map((branch) => {
                    return (
                      <Dropdown.Item
                        value={branch.Name}
                        onClick={() => {
                          setUserBranch(branch.Name);
                          setError(null);
                        }}
                      >
                        {branch.Name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group
              id="Number"
              className={CreateUserProfileCSS.userProfileGroup}
            >
              <Form.Label>Contact Number</Form.Label>
              <input
                type="text"
                name="number"
                pattern="[6789]{1}[0-9]{9}"
                title="Enter Valid Mobile number with 6-9 and remaing 9 digit with 0-9"
                required
                onChange={(event) => {
                  setUserNum(event.target.value);
                }}
                className="form-control"
                id="numImput"
                placeholder="Mobile Number"
              />
            </Form.Group>

            <Form.Group
              id="Address"
              className={CreateUserProfileCSS.userProfileGroup}
            >
              <Form.Label>Address</Form.Label>
              <textarea
                type="text"
                name="address"
                required
                title="Enter valid address"
                onChange={(event) => {
                  setUserAddress(event.target.value);
                }}
                className="form-control"
                id="nameImput"
                placeholder="Address"
              />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-20" type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default CreateUserProfile;
