import React from "react"
import CheckMark from "../../../../images/icons/checkmark.svg"
import Reload from "../../../../images/icons/reload.svg"
import Close from "../../../../images/icons/close.svg"

const CommonIcons = props => {
  return (
    <>
      <button
        className="buttonUniformity"
        onClick={() =>
          props.editTodoItem({
            id: props.id,
            complete: props.complete,
          })
        }
      >
        <img src={!props.complete ? CheckMark : Reload} alt="Check todo" />
      </button>
      <button
        className="buttonUniformity"
        onClick={() =>
          props.deleteTodoItem({
            id: props.id,
            complete: props.complete,
          })
        }
      >
        <img src={Close} alt="Close" />
      </button>
    </>
  )
}

export default CommonIcons
