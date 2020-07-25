import React from "react"
import CheckMark from "../../../images/icons/checkmark.svg"
import Close from "../../../images/icons/close.svg"

const TodoItem = (props) => {
  return (
    <div className="todo">
      <img src={CheckMark} alt="Check todo" />
      <img src={Close} alt="Close" />
      {props.name}
      <br />
    </div>
  )
}

export default TodoItem
