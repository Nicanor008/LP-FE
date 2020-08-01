import React from "react"
import "./button.scss"

const Button = props => (
  <button className={`${props.classButtonName} btn btn-white btn-animate`} onClick={props.onclick}>
    <img src={props.icon} alt="Add Todo" /> {props.name}
  </button>
)

export default Button
