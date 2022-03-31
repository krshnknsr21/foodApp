import React, { useState, useEffect, useRef } from "react";
import BranchCSS from "./Branch.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Alert, Button, Badge } from "react-bootstrap";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const br = [
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
      "Star Atria Mall, Near N C. Kelkar Rd, Dadar West, Dadar, Mumbai, Maharashtra - 400028",
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

function Branch() {
  const { currentUser, userDetails, getUserDetails } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userDoc = doc(db, "users", currentUser.uid);

  useEffect(() => {
    getUserDetails();
    console.log("Branch");
  }, []);

  const branchName = useRef(userDetails.branch);

  async function handleBranchChange() {
    try {
      setError("");
      setLoading(true);
      await updateDoc(userDoc, {
        branch: branchName.current,
      });
      getUserDetails();
    } catch {
      setError("Failed to change Branch");
    }
    setLoading(false);
  }

  return (
    <div className={BranchCSS.branchContainer}>
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 className={BranchCSS.branchTitle}>Our Branches</h1>
      <ul className={BranchCSS.branchCards}>
        {br.map((item) => {
          return (
            <li className={BranchCSS.cards_item}>
              <div className={BranchCSS.card}>
                <div
                  className={
                    userDetails.branch === item.Name
                      ? BranchCSS.card_content
                      : BranchCSS.card_content_selected
                  }
                >
                  <h2 className={BranchCSS.card_title}>{item.Name}</h2>
                  <p className={BranchCSS.card_text}>
                    ADDRESS : {item.Address}
                  </p>
                  <p className={BranchCSS.card_text}>
                    CONTACT : {item.contact}
                  </p>
                  {userDetails.branch === item.Name ? (
                    <Badge bg="primary" className={BranchCSS.selectedBranch}>
                      Current Branch
                    </Badge>
                  ) : (
                    <Button
                      ref={branchName}
                      variant="danger"
                      className="w-100"
                      onClick={() => {
                        branchName.current = item.Name;
                        handleBranchChange();
                      }}
                      disabled={loading}
                    >
                      Select Branch
                    </Button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Branch;
