import React from "react"
import "./loader.css"

const Loader = ({ contextT }) => (
  <div className="lds-ripple">
    <div></div>
    <div></div>
    <p style={{ marginTop: "4.3rem" }}>{contextT}</p>
  </div>
)
export default Loader

