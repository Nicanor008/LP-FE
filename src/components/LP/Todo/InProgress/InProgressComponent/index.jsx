import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"
import InProgressItems from '../InProgressItems'
import { server } from '../../../../../utils/baseUrl'

const InProgressComponent = ({
    form,
    deleteTodoItem,
    editTodoItem,
    setState
}) => {
    const apiBaseUrl = useBaseUrl()

  const [ongoingData, setData] = useState([])
  const [ongoingDataInKeywords, setDataInKeywords] = useState([])
  const [ongoingoader, setOngoingLoader] = useState(false)

  // get ongoing todo data
  const getOngoingTodo = async () => {
    setOngoingLoader(true)
    try {
      const response = await server
        .get(`${apiBaseUrl}/todo/ongoing`)
      setOngoingLoader(false)

      // if user has todo items in progress, then hide write todo
      if (response.data) {
        setState({
        ...form,
        showCreateTodo: false,
        })
      }
      
      setDataInKeywords(response.data.groupedByKeywords)
      setData(response.data.data)
    }
    catch (e) {
      setData([])
      setOngoingLoader(false)
    }
  }

      // close ongoing todo body
  const onClickArrowOngoingTodo = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("showOngoingTodo", !form.showOngoingTodo)
      if (form.showOngoingTodo === undefined) {
        return setState({
          ...form,
          showOngoingTodo: false,
        })
      }
      return setState({
        ...form,
        showOngoingTodo: !form.showOngoingTodo,
      })
    }
  }

    return (
        <Box my={4} className="secondRowTodo">
            <InProgressItems
                newData={form.newDataAdded}
                deleteTodoItem={deleteTodoItem}
                editTodoItem={editTodoItem}
                showBody={
                form.showOngoingTodo === undefined
                    ? true
                    : form.showOngoingTodo
                }
                onClickArrow={onClickArrowOngoingTodo}
                getOngoingTodo={getOngoingTodo}
                dataInKeywords={ongoingDataInKeywords}
                data={ongoingData}
                loading={ongoingoader}
            />
        </Box>
    )
}

export default InProgressComponent
