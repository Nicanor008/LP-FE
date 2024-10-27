import React, { useState } from "react"
import { Flex } from "@chakra-ui/react"
import "../../common/modal/modal.scss"
import { server } from "../../../utils/baseUrl"
import TodoModal from "./TodoModal"
import CommonIcons from "./icons/editAndDeleteIcons"

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
      <Flex className="todo" alignItems="center">
        <CommonIcons
          data={data}
          complete={props.complete}
          editTodoItem={props.editTodoItem}
          deleteTodoItem={props.deleteTodoItem}
          id={props.id}
        />
        <button
          className="buttonUniformity"
          onClick={() => onClickViewOneItem(props.id)}
        >
          <p className="todoItemName">{props.name}</p>
        </button>
      </Flex>

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
