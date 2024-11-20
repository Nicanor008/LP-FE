import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Love from "../../../../../images/icons/love.svg"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"
import Tabs from "../../tabs"
import TodoItem from "../../todo"
import TodoItemByKeywords from "../../ByKeywords"
import { Loader } from "../../../../common"
import { SearchTodoByName } from "../../SearchTodo"
import FiltersNotFound from "../../FilterTodo/FiltersNotFound"

const CompletedTodoItems = ({
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  newData,
  data,
  dataInKeywords,
  loading,
  getCompletedTodo,
  completedDataInPriority,
  filters,
  isFiltering,
  handleClearFilters,
  noTaskCompletedWith24Hours
}) => {
  const [viewByCompletedTodo, setViewByCompletedTodo] = useState(sessionStorage?.getItem('viewOngoingTodoBy') ?? 'name')
  const apiBaseUrl = useBaseUrl()
  const isMobile = useBreakpointValue({ base: true, md: false });

  // componentDidMount
  useEffect(() => {
    getCompletedTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  // on click view by ......, do the swapping
  const onClickSwapButtonCompleted = (option) => {
    sessionStorage.setItem('viewCompletedTodoBy', option)
    return setViewByCompletedTodo(option)
  }

  return (
    <Box fontFamily="Arial">
      {loading ? (
        <Loader />
      ) : (
        // (data?.length > 0 || dataInKeywords?.length > 0 || completedDataInPriority?.length > 0) && (
          // (data?.length > 0 || dataInKeywords?.length > 0 || completedDataInPriority?.length > 0) && (
          <>
            {isMobile && (
              <Text mx={3} fontWeight={700} pb={0} mb={0}>
                {data?.length} Task{data?.length > 1 ? 's' : ''} Completed in 24 hours
              </Text>
            )}
            <Tabs
              todoTitleIcon={Love}
              title={`${!isMobile ? `${data?.length ?? ''} Task${data?.length > 1 ? 's' : ''} Completed` : ''}`}
              showBody={showBody}
              onClickArrow={onClickArrow}
              todoItemsTab="true"
              onclickSwapButton={onClickSwapButtonCompleted}
              viewByTodo={viewByCompletedTodo}
              searchBar={<SearchTodoByName tasks={data}/>}
              filters={filters}
            >
              <Box className="onGoingTodoWrapper">
                {isFiltering && (data?.length === 0 || dataInKeywords?.length === 0 || completedDataInPriority?.length === 0) && (
                  <FiltersNotFound onClick={handleClearFilters} noTaskCompletedWith24Hours={noTaskCompletedWith24Hours} />
                )}
                {viewByCompletedTodo === 'name' && data?.map(todo => (
                  <TodoItem
                    name={todo.name}
                    key={Math.random()}
                    complete={true}
                    id={todo._id}
                    deleteTodoItem={deleteTodoItem}
                    editTodoItem={editTodoItem}
                    apiBaseUrl={apiBaseUrl}
                    todo={todo}
                  />
                ))}
                {viewByCompletedTodo === 'tags' && dataInKeywords &&
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
                  }
                )}
                {viewByCompletedTodo === 'priority' && completedDataInPriority &&
                  completedDataInPriority.map(dataKeywords => {
                    return (
                      <TodoItemByKeywords
                        data={dataKeywords}
                        deleteTodoItem={deleteTodoItem}
                        editTodoItem={editTodoItem}
                        key={Math.random()}
                        completedKeywords={true}
                        id={completedDataInPriority._id}
                        complete={true}
                      />
                    )
                  }
                )}
              </Box>
            </Tabs>
          </>
        // )
      )}
    </Box>
  )
}

export default CompletedTodoItems

