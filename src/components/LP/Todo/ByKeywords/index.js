import React from "react"
import moment from "moment"
import "../../../common/modal/modal.scss"
import "./byKeywords.scss"
import CommonIcons from "../icons/editAndDeleteIcons"

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
                        <>
                          <CommonIcons data={data} complete={props.complete} />{" "}
                          {data.name}
                        </>
                      )
                    ) : (
                      <>
                        <CommonIcons data={data} complete={props.complete} />
                        {data.name}
                      </>
                    )}
                  </div>
                ) : (
                    props.completedKeywords ? ( // check if completed tasks
                        moment(data.updatedAt, "YYYYMMDDhhmm")
                          .fromNow()
                          .indexOf("hour") > 1 && ( // get tasks on 24 hours only
                          <>
                            <CommonIcons
                              data={data}
                              complete={props.complete}
                            />
                            {data.name}
                          </>
                        )
                    ) : (
                      <>
                        <CommonIcons data={data} complete={props.complete} />
                        {data.name}
                      </>
                    )
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
