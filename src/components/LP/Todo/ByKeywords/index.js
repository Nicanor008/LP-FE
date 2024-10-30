import React, { useState } from "react"
import { Box, Text } from "@chakra-ui/react"
import moment from "moment"
import CommonIcons from "../icons/editAndDeleteIcons"
import TodoModal from "../TodoModal"
import { server } from "../../../../utils/baseUrl"
import "../../../common/modal/modal.scss"
import "./byKeywords.scss"
import { useBaseUrl } from "../../../../hooks/useBaseUrl"

export const timeByDuration = ({ time, value }) => {
  return moment(time, "YYYYMMDDhhmm").fromNow().indexOf(value) > 1
}

const TodoItemByKeywords = props => {
  const apiBaseUrl = useBaseUrl()
  const [dataModal, setDataModal] = useState({})
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
      return setDataModal(item.data.data)
    })
  }

  const IconsWithTodoName = prop => {
    return (
      <>
        <CommonIcons
          data={prop.data}
          complete={prop.complete}
          editTodoItem={prop.editTodoItem}
          deleteTodoItem={prop.deleteTodoItem}
          id={prop.id}
          viewTodoItem={onClickViewOneItem}
        />

        <Text
          bg="inherit"
          m={0}
          cursor="pointer"
          fontSize="initial"
          fontFamily="IBM Plex mono"
          onClick={() => onClickViewOneItem(prop.data?.id)}
        >
          <p className="todoItemName">{prop.data?.name}</p>
        </Text>
      </>
    )
  }

  return (
    <Box>
      <Box className="groupedTodo">
        {props.completedKeywords ? ( // determine the todo status
          props.data[1].map(s => {
            // get active in the last 24 hours : TODO: Optimize this code, doesn't work at the moment
            return (
              moment(s.updatedAt, "YYYYMMDDhhmm").fromNow().indexOf("hour") > 1
            )
          }) && <p className="groupedTodoTitle">{props.data[0]}</p>
        ) : (
          <p className="groupedTodoTitle">{props.data[0]}</p> // show on ongoing only
        )}

        <ul className="GroupedTodoTextWrapper">
          {props.data[1].map(data => (
            <li key={data._id} style={{ alignItems: 'center', marginBottom: 0 }}>
              <IconsWithTodoName
                data={data}
                complete={props.complete}
                editTodoItem={props.editTodoItem}
                deleteTodoItem={props.deleteTodoItem}
                id={data._id}
              />
            </li>
          ))}
        </ul>
      </Box>

      {/* modal */}
      {showModal && (
        <TodoModal
          data={dataModal}
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

export default TodoItemByKeywords
