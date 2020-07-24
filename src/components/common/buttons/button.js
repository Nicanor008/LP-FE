import React from "react"
import "./button.scss"
import Plus from "../../../images/icons/plus.svg"

const Button = props => (
  <button className={props.classButtonName} onClick={props.onclick}>
    <img src={Plus} alt="Add Todo" /> {props.name}
  </button>
)

export default Button
