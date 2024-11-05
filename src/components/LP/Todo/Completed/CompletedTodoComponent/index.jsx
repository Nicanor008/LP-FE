import React, { useState } from 'react'
import { Box } from "@chakra-ui/react"
import CompletedTodoItems from '../CompletedTodoItems'
import { server } from '../../../../../utils/baseUrl'
import { useBaseUrl } from '../../../../../hooks/useBaseUrl'
import moment from 'moment'

const CompletedTodoComponent = ({
    form,
    deleteTodoItem,
    editTodoItem,
    setState
}) => {
  const [completedLoader, setCompletedLoader] = useState(false)
  const apiBaseUrl = useBaseUrl()
  const [completedData, setCompletedData] = useState([])
  const [completedDataInKeywords, setCompletedDataInKeywords] = useState([])
  const [completedDataInPriority, setCompletedDataInPriority] = useState([])

  // get completed todo data
  const getCompletedTodo = async () => {
    // setCompletedLoader(true)
    setCompletedData([])
    try {
      const response = await server
        .get(`${apiBaseUrl}/todo/complete`)
      // get duration last updated
      response.data.data.forEach(s => {
        const durationLastUpdated = moment(
          s.updatedAt,
          "YYYYMMDDhhmm"
        ).fromNow()
        if (durationLastUpdated.indexOf("hour") > 1 ||
          durationLastUpdated.indexOf("minute") > 1) {
        //   setCompletedLoader(false)
          setCompletedDataInKeywords(response.data.groupedByKeywords) // get grouped data
          setCompletedData(data => [...data, s])
          setCompletedDataInPriority(response.data?.groupedByPriority)
        }
      })
    }
    catch (e) {
      setCompletedData([])
    //   setCompletedLoader(false)
    }
  }
    // close create todo body
    const onClickArrowOnCompletedTodo = () => {
        if (typeof window !== "undefined") {
        sessionStorage.setItem("showCompletedTodo", !form.showCompletedTodo)
        if (form.showCompletedTodo === undefined) {
            return setState({
            ...form,
            showCompletedTodo: false,
            })
        }
        return setState({
            ...form,
            showCompletedTodo: !form.showCompletedTodo,
        })
        }
    }

    return (
      <Box className="thirdRowTodo">
        <CompletedTodoItems
          newData={form.newCompletedData}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
          showBody={
            form.showCompletedTodo === undefined
              ? true
              : form.showCompletedTodo
          }
          onClickArrow={onClickArrowOnCompletedTodo}
          data={completedData}
          dataInKeywords={completedDataInKeywords}
          loading={completedLoader}
          getCompletedTodo={getCompletedTodo}
          completedDataInPriority={completedDataInPriority}
        />
      </Box>
    )
}

export default CompletedTodoComponent
