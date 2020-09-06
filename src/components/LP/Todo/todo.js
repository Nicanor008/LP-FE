import React, { useState } from "react"
import CheckMark from "../../../images/icons/checkmark.svg"
import Reload from "../../../images/icons/reload.svg"
import Close from "../../../images/icons/close.svg"
import "../../common/modal/modal.scss"
import { server } from "../../../utils/baseUrl"
import TodoModal from "./TodoModal"

const TodoItem = props => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // open/close modal
  const CloseOrOpenModal = () => {
    setShowModal(!showModal)
  }

  // view single item
  const onClickViewOneItem = id => {
    setLoading(true)
    setShowModal(!showModal)
    server.get(`${props.apiBaseUrl}/todo/${id}`).then(item => {
      setLoading(false)
      setData(item.data.data)
    })
  }

  return (
    <div>
      <div className="todo">
        {!props.complete ? (
          <img
            src={CheckMark}
            alt="Check todo"
            onClick={() =>
              props.editTodoItem({ id: props.id, complete: props.complete })
            }
          />
        ) : (
          <img
            src={Reload}
            alt="Revert todo"
            onClick={() =>
              props.editTodoItem({ id: props.id, complete: props.complete })
            }
          />
        )}
        <img
          src={Close}
          alt="Close"
          onClick={() =>
            props.deleteTodoItem({ id: props.id, complete: props.complete })
          }
        />
        <p
          className="todoItemName"
          onClick={() => onClickViewOneItem(props.id)}
        >
          {props.name}
        </p>
      </div>

      {/* modal */}
      {showModal && (
        <TodoModal
          data={data}
          loading={loading}
          CloseOrOpenModal={CloseOrOpenModal}
          showModal={showModal}
          complete={props.complete}
          id={props.id}
          editTodoItem={props.editTodoItem}
          deleteTodoItem={props.deleteTodoItem}
        />
      )}
    </div>
  )
}

export default TodoItem
