import React, { useState } from "react"
import moment from "moment"
import "../../../common/modal/modal.scss"
import "./byKeywords.scss"
import CommonIcons from "../icons/editAndDeleteIcons"
import TodoModal from "../TodoModal"
import { server } from "../../../../utils/baseUrl"

export const timeByDuration = ({ time, value }) => {
  return moment(time, "YYYYMMDDhhmm").fromNow().indexOf(value) > 1
}

const TodoItemByKeywords = props => {
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
    server.get(`${props.apiBaseUrl}/todo/${id}`).then(item => {
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
        />

        <p className="todoItemName" onClick={() => onClickViewOneItem(prop.id)}>
          {prop.data.name}
        </p>
      </>
    )
  }

  return (
    <div>
      <div className="groupedTodo">
        <p className="groupedTodoTitle">{props.data[0]}</p>
        {props.data[1].map(data => (
          <div key={data._id}>
            <ul className="GroupedTodoTextWrapper">
              <li className="todoItemName GroupedTodoText">
                {props.data[0] === "" || props.data[0] === null ? (
                  <div className="noKeywordTodoItem">
                    {/* // no keyword items */}
                    {!props.completedKeywords && (
                      <IconsWithTodoName
                        data={data}
                        complete={props.complete}
                        editTodoItem={props.editTodoItem}
                        deleteTodoItem={props.deleteTodoItem}
                        id={data._id}
                      />
                    )}
                  </div>
                ) : (
                  !props.completedKeywords && ( // check if completed tasks
                    <IconsWithTodoName
                      data={data}
                      complete={props.complete}
                      editTodoItem={props.editTodoItem}
                      deleteTodoItem={props.deleteTodoItem}
                      id={data._id}
                    />
                  )
                )}
              </li>
            </ul>
          </div>
        ))}
      </div>

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
    </div>
  )
}

export default TodoItemByKeywords
