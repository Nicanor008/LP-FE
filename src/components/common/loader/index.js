import React from "react";
import "./loader.css";

export const Loader = ({ contextT, },) => (
  <div className="lds-ripple">
    <div />
    <div />
    <p style={{ marginTop: "4.3rem", }}>{contextT}</p>
  </div>
);
