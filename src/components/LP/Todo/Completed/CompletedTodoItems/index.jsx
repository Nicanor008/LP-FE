import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Love from "../../../../../images/icons/love.svg"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"
import Tabs from "../../tabs"
import TodoItem from "../../todo"
import TodoItemByKeywords from "../../ByKeywords"
import { Loader } from "../../../../common"

const CompletedTodoItems = ({
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  newData,
  data,
  dataInKeywords,
  loading,
  getCompletedTodo
}) => {
  const [viewByCompletedTodo, setViewByCompletedTodo] = useState(true)
  const apiBaseUrl = useBaseUrl()
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    <Box>
      {loading ? (
        <Loader />
      ) : (
        (data.length > 0 || dataInKeywords.length > 0) && (
          <>
            {isMobile && (
              <Text mx={3} fontWeight={700} pb={0} mb={0}>
                {data.length} Task{data.length > 1 ? 's' : ''} Completed in 24 hours
              </Text>
            )}
            <Tabs
              todoTitleIcon={Love}
              title={`${!isMobile ? `${data.length} Task${data.length > 1 ? 's' : ''} Completed` : ''}`}
              showBody={data.length > 0 && showBody}
              onClickArrow={onClickArrow}
              todoItemsTab="true"
              onclickSwapButton={onClickSwapButtonCompleted}
              viewByTodo={viewByCompletedTodo}
            >
              <Box className="onGoingTodoWrapper">
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

export default CompletedTodoItems
