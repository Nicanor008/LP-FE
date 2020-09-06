import React, { useEffect, useState } from "react"
import TodoItem from "./todo"
import axios from "axios"
import { Loader } from "../../common/loader"
import Tabs from "./tabs"
import Walk from "../../../images/icons/walk.svg"
import TodoItemByKeywords from "./ByKeywords"

const OngoingTodo = ({
  newData,
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  loader,
  apiBaseUrl,
  headers,
}) => {
  const [data, setData] = useState([])
  const [dataInKeywords, setDataInKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewByTodo, setViewByTodo] = useState(true)

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${apiBaseUrl}/todo/ongoing`, headers)
      .then(response => {
        setLoading(false)
        setDataInKeywords(response.data.groupedByKeywords)
        setData(response.data.data)
      })
      .catch(() => {
        setData([])
        setLoading(false)
      })
  }, [newData, apiBaseUrl])

  // on click view by ......, do the swapping
  const onClickSwapButton = () => {
    return setViewByTodo(!viewByTodo)
  }

  return (
    <div>
      {loading || loader ? (
        <Loader />
      ) : (
        data.length > 0 && (
          <>
            <Tabs
              todoTitleIcon={Walk}
              title={`${
                data.length > 1
                  ? `${data.length} Tasks in Progress`
                  : `${data.length} Task in Progress`
              }`}
              showBody={data.length > 0 && showBody}
              onClickArrow={onClickArrow}
              todoItemsTab="true"
              onclickSwapButton={onClickSwapButton}
              viewByTodo={viewByTodo}
            >
              <div className="onGoingTodoWrapper">
                {viewByTodo
                  ? data.map(todo => (
                      <TodoItem
                        name={todo.name}
                        key={todo._id}
                        complete={false}
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
                          id={dataInKeywords._id}
                          complete={false}
                          apiBaseUrl={apiBaseUrl}
                        />
                      )
                    })}
              </div>
            </Tabs>

            <br />
            <br />
          </>
        )
      )}
    </div>
  )
}

export default OngoingTodo
