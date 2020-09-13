import React from "react";
import "./inputs.scss";

const Input = (props) => (
  <>
    <label htmlFor={props.labelClassName}>{props.labelName}</label> 
    &nbsp;
    <br />
    <input
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      className="input"
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onchange}
    />
  </>
);

export default Input;
