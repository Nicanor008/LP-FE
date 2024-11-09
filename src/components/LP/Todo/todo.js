import React, { useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { server } from "../../../utils/baseUrl"
import TodoModal from "./TodoModal"
import CommonIcons from "./icons/editAndDeleteIcons"
import { useBaseUrl } from "../../../hooks/useBaseUrl"
import "../../common/modal/modal.scss"
import { TodoItemSubTask } from "./SubTasks"

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

  const cleanAndTruncateHTML = (html, maxLength = 200) => {
    // Remove HTML tags and trim whitespace
    const plainText = html.replace(/<p><br\s*\/?><\/p>/g, '').trim();
    
    // Truncate to the specified max length and add ellipsis if necessary
    return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
  };
  
  return (
    <Box w="100%">
      <Flex className="todo" alignItems="center" borderBottom="0.2px solid" borderColor="blue.100" flexDir="column" w="100%">
        <Flex alignItems="center" w="100%">
          <CommonIcons
            data={data}
            complete={props.complete}
            editTodoItem={props.editTodoItem}
            deleteTodoItem={props.deleteTodoItem}
            id={props.id}
            viewTodoItem={onClickViewOneItem}
          />
          <Box
            bg="inherit"
            m={0}
            cursor="pointer"
            fontSize="initial"
            fontFamily="IBM Plex Mono"
            onClick={() => onClickViewOneItem(props.id)}
            dangerouslySetInnerHTML={{ __html: cleanAndTruncateHTML(props.name) }}
          />
          
        </Flex>
        {/* subtasks */}
        {props.todo?.subTasks?.length > 0 && <TodoItemSubTask subTasks={props.todo?.subTasks} />}
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
          setData={setData}
        />
      )}
    </Box>
  )
}

export default TodoItem
