import React, { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import TodoItem from "./todo"
import Tabs from "./tabs"
import Love from "../../../images/icons/love.svg"
import TodoItemByKeywords from "./ByKeywords"

const CompletedTodo = ({
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  apiBaseUrl,
  headers,
  newData,
}) => {
  const [data, setData] = useState([])
  const [dataInKeywords, setDataInKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewByCompletedTodo, setViewByCompletedTodo] = useState(true)

  const getCompletedTodo = async () => {
    setLoading(true)
    setData([])
    try {
      const response = await axios
        .get(`${apiBaseUrl}/todo/complete`, headers)
      // get duration last updated
      response.data.data.forEach(s => {
        const durationLastUpdated = moment(
          s.updatedAt,
          "YYYYMMDDhhmm"
        ).fromNow()
        if (durationLastUpdated.indexOf("hour") > 1 ||
          durationLastUpdated.indexOf("minute") > 1) {
          setLoading(false)
          setDataInKeywords(response.data.groupedByKeywords) // get grouped data
          setData(data => [...data, s])
        }
      })
    }
    catch (e) {
      setData([])
      setLoading(false)
    }
  }
  // componentDidMount
  useEffect(() => {
    getCompletedTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  // on click view by ......, do the swapping
  const onClickSwapButtonCompleted = () => {
    return setViewByCompletedTodo(!viewByCompletedTodo)
  }

  return (
    <div>
      {loading ? (
        <span></span>
      ) : (
        (data.length > 0 || dataInKeywords.length > 0) && (
          <Tabs
            todoTitleIcon={Love}
            title={`${
              data.length > 1
                ? `${data.length} Tasks Completed`
                : `${data.length} Task Completed`
            }`}
            showBody={data.length > 0 && showBody}
            onClickArrow={onClickArrow}
            todoItemsTab="true"
            onclickSwapButton={onClickSwapButtonCompleted}
            viewByTodo={viewByCompletedTodo}
          >
            <div className="onGoingTodoWrapper">
              {viewByCompletedTodo
                ? data.map(todo => (
                    <TodoItem
                      name={todo.name}
                      key={Math.random()}
                      complete={true}
                      id={todo._id}
                      deleteTodoItem={deleteTodoItem}
                      editTodoItem={editTodoItem}
                      apiBaseUrl={apiBaseUrl}
                    />
                  ))
                : dataInKeywords &&
                  dataInKeywords.map(dataKeywords => {
                    return (
                      <TodoItemByKeywords
                        data={dataKeywords}
                        deleteTodoItem={deleteTodoItem}
                        editTodoItem={editTodoItem}
                        key={Math.random()}
                        completedKeywords={true}
                        id={dataInKeywords._id}
                        complete={true}
                        apiBaseUrl={apiBaseUrl}
                      />
                    )
                  })}
            </div>
          </Tabs>
        )
      )}
    </div>
  )
}

export default CompletedTodo
