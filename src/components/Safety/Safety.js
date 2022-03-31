import React from "react";
import SafetyCSS from "./Safety.module.css";
import safety from "./SafetyImage/safety3.jpg";
const Safety = () => {
  return (
    <div className={SafetyCSS.safety}>
      <img
        className={SafetyCSS.safetyImage}
        src= {safety}
        alt="safety"
      />
    </div>
  );
};

export default Safety;
