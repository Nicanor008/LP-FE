import React from "react"
import CheckMark from "../../../../images/icons/checkmark.svg"
import Reload from "../../../../images/icons/reload.svg"
import Close from "../../../../images/icons/close.svg"

const CommonIcons = props => {
  return (
    <>
      {!props.complete ? (
        <img
          src={CheckMark}
          alt="Check todo"
          onClick={() =>
            props.editTodoItem({
              id: props.data._id,
              complete: props.data.completed,
            })
          }
        />
      ) : (
        <img
          src={Reload}
          alt="Revert todo"
          onClick={() =>
            props.editTodoItem({
              id: props.data._id,
              complete: props.data.completed,
            })
          }
        />
      )}
      <img
        src={Close}
        alt="Close"
        onClick={() =>
          props.deleteTodoItem({
            id: props.data._id,
            complete: props.data.completed,
          })
        }
      />
    </>
  )
}

export default CommonIcons
