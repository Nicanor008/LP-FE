import { Box, Text, useBreakpointValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Walk from "../../../../../images/icons/walk.svg"
import TodoItem from "../../todo"
import TodoItemByKeywords from "../../ByKeywords"
import Tabs from "../../tabs"
import { Loader } from "../../../../common"
import { SearchTodoByName } from "../../SearchTodo"
import FiltersNotFound from "../../FilterTodo/FiltersNotFound"

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
  loading,
  dataInPriority,
  filters,
  isFiltering,
  handleClearFilters,
  setState
}) => {
  const [viewByTodo, setViewByTodo] = useState(sessionStorage?.getItem('viewOngoingTodoBy') ?? 'name')
  const isMobile = useBreakpointValue({ base: true, md: false });

  // componentDidMount
  useEffect(() => {
    getOngoingTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  // on click view by ......, do the swapping
  const onClickSwapButton = (option) => {
    sessionStorage.setItem('viewOngoingTodoBy', option)
    return setViewByTodo(option)
  }

  return (
    <Box fontFamily="arial">
      {loading || loader ? (
        <Loader />
      ) : (
        (data?.length > 0 || (isFiltering && data?.length === 0)) && (
          <>
            {isMobile && data?.length > 0 && (
              <Text mx={3} fontWeight={700} pb={0} mb={0}>
                {data?.length ?? ''} Task{data?.length > 1 ? 's' : ''} in Progress
              </Text>
            )}
            <Tabs
              todoTitleIcon={Walk}
              title={`${!isMobile ? `${data?.length} Task${data?.length > 1 ? 's' : ''} in Progress` : ''}`}
              showBody={showBody}
              onClickArrow={onClickArrow}
              todoItemsTab="true"
              onclickSwapButton={onClickSwapButton}
              viewByTodo={viewByTodo}
              searchBar={<SearchTodoByName tasks={data}/>}
              filters={filters}
            >
              <Box className="onGoingTodoWrapper">
                {isFiltering && data?.length === 0 && (
                  <FiltersNotFound onClick={handleClearFilters} />
                )}
                {viewByTodo === 'name' && (
                  data?.map(todo => (
                    <TodoItem
                      name={todo.name}
                      key={todo._id}
                      complete={false}
                      id={todo._id}
                      deleteTodoItem={deleteTodoItem}
                      editTodoItem={editTodoItem}
                      todo={todo}
                      setState={setState}
                    />
                    )
                  )
                )}
                {viewByTodo === 'tags' && (
                  dataInKeywords &&
                    dataInKeywords.map(dataKeywords => {
                      return (
                        <TodoItemByKeywords
                          data={dataKeywords}
                          deleteTodoItem={deleteTodoItem}
                          editTodoItem={editTodoItem}
                          key={Math.random()}
                          id={dataInKeywords._id}
                          complete={false}
                          setState={setState}
                        />
                      )
                    })
                  )}
                  {viewByTodo === 'priority' && (
                    dataInPriority &&
                      dataInPriority.map(dataKeywords => {
                        return (
                          <TodoItemByKeywords
                            data={dataKeywords}
                            deleteTodoItem={deleteTodoItem}
                            editTodoItem={editTodoItem}
                            key={Math.random()}
                            id={dataInPriority._id}
                            complete={false}
                            setState={setState}
                          />
                        )
                      }
                    )
                  )}
              </Box>
            </Tabs>
          </>
        )
      )}
    </Box>
  )
}

export default InProgressItems
