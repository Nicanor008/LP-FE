import React from "react"
import moment from "moment"
import "../../../common/modal/modal.scss"
import "./byKeywords.scss"
import CommonIcons from "../icons/editAndDeleteIcons"

const IconsWithTodoName = props => {
  return (
    <>
      <CommonIcons
        data={props.data}
        complete={props.complete}
        editTodoItem={props.editTodoItem}
        deleteTodoItem={props.deleteTodoItem}
      />
      {props.data.name}
    </>
  )
}

const TodoItemByKeywords = props => {
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
                    {props.completedKeywords ? (
                      moment(data.updatedAt, "YYYYMMDDhhmm")
                        .fromNow()
                        .indexOf("hour") > 1 && (
                        <IconsWithTodoName
                          data={data}
                          complete={props.complete}
                          editTodoItem={props.editTodoItem}
                          deleteTodoItem={props.deleteTodoItem}
                        />
                      )
                    ) : (
                      <IconsWithTodoName
                        data={data}
                        complete={props.complete}
                        editTodoItem={props.editTodoItem}
                        deleteTodoItem={props.deleteTodoItem}
                      />
                    )}
                  </div>
                ) : props.completedKeywords ? ( // check if completed tasks
                  moment(data.updatedAt, "YYYYMMDDhhmm")
                    .fromNow()
                    .indexOf("hour") > 1 && ( // get tasks on 24 hours only
                    <IconsWithTodoName
                      data={data}
                      complete={props.complete}
                      editTodoItem={props.editTodoItem}
                      deleteTodoItem={props.deleteTodoItem}
                    />
                  )
                ) : (
                  <IconsWithTodoName
                    data={data}
                    complete={props.complete}
                    editTodoItem={props.editTodoItem}
                    deleteTodoItem={props.deleteTodoItem}
                  />
                )}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoItemByKeywords
