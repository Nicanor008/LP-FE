import { Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Walk from "../../../../../images/icons/walk.svg"
import TodoItem from "../../todo"
import TodoItemByKeywords from "../../ByKeywords"
import Tabs from "../../tabs"
import { Loader } from "../../../../common/loader"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"

const InProgressItems = ({
  newData,
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  loader,
  getOngoingTodo,
  dataInKeywords,
  data,
  loading
}) => {
  const apiBaseUrl = useBaseUrl()
  const [viewByTodo, setViewByTodo] = useState(true)

  // componentDidMount
  useEffect(() => {
    getOngoingTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  // on click view by ......, do the swapping
  const onClickSwapButton = () => {
    return setViewByTodo(!viewByTodo)
  }

  return (
    <Box>
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
              <Box className="onGoingTodoWrapper">
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
              </Box>
            </Tabs>
          </>
        )
      )}
    </Box>
  )
}

export default InProgressItems
