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

  const title = [...new Set(props.data)]
  const findActive = (allData, e) => {
    e.preventDefault()
    allData.map(
      s => moment(s.updatedAt, "YYYYMMDDhhmm").fromNow().indexOf("hour") > 1
    )
  }
  return (
    <div>
      <div className="groupedTodo">
        {props.completedKeywords ? ( // determine the todo status
          props.data[1].map(s => { // get active in the last 24 hours : TODO: Optimize this code, doesn't work at the moment
            return (
              moment(s.updatedAt, "YYYYMMDDhhmm").fromNow().indexOf("hour") > 1
            )
          }) && <p className="groupedTodoTitle">{props.data[0]}</p>
        ) : (
          <p className="groupedTodoTitle">{props.data[0]}</p> // show on ongoing only
        )}

        {props.data[1].map(data => (
          <div key={data._id}>
            <ul className="GroupedTodoTextWrapper">
              {props.data[0] === "" || props.data[0] === null ? (
                <div className="noKeywordTodoItem">
                  {props.completedKeywords ? (
                    moment(data.updatedAt, "YYYYMMDDhhmm")
                      .fromNow()
                      .indexOf("hour") > 1 && (
                      <li
                        className="todoItemName GroupedTodoText"
                        key={data._id}
                      >
                        <IconsWithTodoName
                          data={data}
                          complete={props.complete}
                          editTodoItem={props.editTodoItem}
                          deleteTodoItem={props.deleteTodoItem}
                          id={data._id}
                        />
                      </li>
                    )
                  ) : (
                    <li key={data._id}>
                      <IconsWithTodoName
                        data={data}
                        complete={props.complete}
                        editTodoItem={props.editTodoItem}
                        deleteTodoItem={props.deleteTodoItem}
                        id={data._id}
                      />
                    </li>
                  )}
                </div>
              ) : props.completedKeywords ? ( // check if completed tasks
                moment(data.updatedAt, "YYYYMMDDhhmm")
                  .fromNow()
                  .indexOf("hour") > 1 && ( // get tasks on 24 hours only
                  <li key={data._id}>
                    <IconsWithTodoName
                      data={data}
                      complete={props.complete}
                      editTodoItem={props.editTodoItem}
                      deleteTodoItem={props.deleteTodoItem}
                      id={data._id}
                    />
                  </li>
                )
              ) : (
                <li key={data._id}>
                  <IconsWithTodoName
                    data={data}
                    complete={props.complete}
                    editTodoItem={props.editTodoItem}
                    deleteTodoItem={props.deleteTodoItem}
                    id={data._id}
                  />
                </li>
              )}
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
