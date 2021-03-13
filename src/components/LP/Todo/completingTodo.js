import React, { useEffect, useState } from "react"
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
  newData,
  data,
  dataInKeywords,
  loading,
  getCompletedTodo
}) => {
  const [viewByCompletedTodo, setViewByCompletedTodo] = useState(true)

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
