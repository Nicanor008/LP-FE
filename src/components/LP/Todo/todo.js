import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { server } from "../../../utils/baseUrl"
import TodoModal from "./TodoModal"
import CommonIcons from "./icons/editAndDeleteIcons"
import { useBaseUrl } from "../../../hooks/useBaseUrl"
import "../../common/modal/modal.scss"

const TodoItem = props => {
  const apiBaseUrl = useBaseUrl()
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
    server.get(`${apiBaseUrl}/todo/${id}`).then(item => {
      setLoading(false)
      setData(item.data.data)
    })
  }
  return (
    <Box>
      <Flex className="todo" alignItems="center">
        <CommonIcons
          data={data}
          complete={props.complete}
          editTodoItem={props.editTodoItem}
          deleteTodoItem={props.deleteTodoItem}
          id={props.id}
          viewTodoItem={onClickViewOneItem}
        />
        <Text
          bg="inherit"
          m={0}
          cursor="pointer"
          fontSize="initial"
          fontFamily="IBM Plex mono"
          onClick={() => onClickViewOneItem(props.id)}
        >
          <p className="todoItemName">{props.name}</p>
        </Text>
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
    </Box>
  )
}

export default TodoItem
