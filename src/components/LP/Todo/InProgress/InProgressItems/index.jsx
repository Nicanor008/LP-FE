import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Walk from "../../../../../images/icons/walk.svg"
import TodoItem from "../../todo"
import TodoItemByKeywords from "../../ByKeywords"
import Tabs from "../../tabs"
import { Loader } from "../../../../common"

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
  const [viewByTodo, setViewByTodo] = useState(true)
  const isMobile = useBreakpointValue({ base: true, md: false });

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
            {isMobile && <Text mx={3} fontWeight={700} pb={0} mb={0}>{data.length} Task{data.length > 1 ? 's' : ''} in Progress</Text>}
            <Tabs
              todoTitleIcon={Walk}
              title={`${!isMobile ? `${data.length} Task${data.length > 1 ? 's' : ''} in Progress` : ''}`}
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
