import React from "react"
import CheckMark from "../../../images/icons/checkmark.svg"
import Reload from "../../../images/icons/reload.svg"
import Close from "../../../images/icons/close.svg"

const TodoItem = props => {
  return (
    <div className="todo">
      {!props.complete ? (
        <img src={CheckMark} alt="Check todo" />
      ) : (
        <img src={Reload} alt="Revert todo" />
      )}
      <img src={Close} alt="Close" />
      {props.name}
      <br />
    </div>
  )
}

export default TodoItem
