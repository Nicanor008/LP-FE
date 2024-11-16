import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import moment from 'moment'
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"
import InProgressItems from '../InProgressItems'
import { server } from '../../../../../utils/baseUrl'
import FilterTodo from '../../FilterTodo'

const InProgressComponent = ({
    form,
    deleteTodoItem,
    editTodoItem,
    setState
}) => {
  const apiBaseUrl = useBaseUrl()
  const [ongoingData, setData] = useState([])
  const [ongoingoader, setOngoingLoader] = useState(false)
  const [filteredTodos, setFilteredTodos] = useState(ongoingData);
  const [isFiltering, setIsFiltering] = useState(false);

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
      
      setData(response.data)
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

  const handleFilterChange = ({ recurrence, priority, time }) => {
    setIsFiltering(true)

    const now = moment();

    // Filter for "data" section
    const filteredData = ongoingData?.data?.filter((todo) => {
      const matchesRecurrence = 
        recurrence.length > 0 && ((recurrence.includes("Once") && (todo.recurrence === "" || todo.recurrence === 'Once')) || recurrence.includes(todo.recurrence))

      const matchesPriority = 
        priority.length > 0 && ((priority.includes("No Priority") && (todo.priority === "" || todo.priority === 'No Priority')) || priority.includes(todo.priority))
  
      const matchesTime = moment(todo.updatedAt).isAfter(now.clone().subtract(time, 'hours'));
  
      return (matchesRecurrence || matchesPriority || matchesTime)
    });

    // Filter for "groupedByKeywords"
    const filteredKeywords = ongoingData?.groupedByKeywords?.map(([keyword, todos]) => {
      const filteredTodos = todos.filter((todo) => {
        const matchesRecurrence = 
          recurrence.length > 0 && ((recurrence.includes("Once") && (todo.recurrence === "" || todo.recurrence === 'Once')) || recurrence.includes(todo.recurrence))

        const matchesPriority = 
          priority.length > 0 && ((priority.includes("No Priority") && (todo.priority === "" || todo.priority === 'No Priority')) || priority.includes(todo.priority))
        
        const matchesTime = moment(todo.updatedAt).isAfter(now.clone().subtract(time, 'hours'));

        return matchesRecurrence || matchesPriority || matchesTime;
      });

      return [keyword, filteredTodos];
    }).filter(([_, todos]) => todos.length > 0);

    // Filter for "groupedByPriority"
    const filteredPriority = ongoingData?.groupedByPriority?.map(([priorityGroup, todos]) => {
      const filteredTodos = todos.filter((todo) => {

      const matchesRecurrence = 
      recurrence.length > 0 && ((recurrence.includes("Once") && (todo.recurrence === "" || todo.recurrence === 'Once')) || recurrence.includes(todo.recurrence))

      const matchesPriority = 
        priority.length > 0 && ((priority.includes("No Priority") && (todo.priority === "" || todo.priority === 'No Priority')) || priority.includes(todo.priority))
      
      const matchesTime = moment(todo.updatedAt).isAfter(now.clone().subtract(time, 'hours'));

        return matchesRecurrence || matchesPriority || matchesTime;
      });

      return [priorityGroup, filteredTodos];
    }).filter(([_, todos]) => todos.length > 0);

    setFilteredTodos({
      ...ongoingData,
      data: filteredData,
      groupedByKeywords: filteredKeywords,
      groupedByPriority: filteredPriority,
    });
  };

  const handleClearFilters = () => {
    setIsFiltering(false)
    setFilteredTodos([])
  };

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
        dataInKeywords={filteredTodos?.groupedByKeywords?.length || isFiltering ? filteredTodos?.groupedByKeywords : ongoingData?.groupedByKeywords}
        data={filteredTodos?.data?.length || isFiltering ? filteredTodos?.data : ongoingData?.data}
        loading={ongoingoader}
        dataInPriority={filteredTodos?.groupedByPriority?.length || isFiltering ? filteredTodos?.groupedByPriority : ongoingData?.groupedByPriority}
        filters={<FilterTodo
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />}
        isFiltering={isFiltering}
        handleClearFilters={handleClearFilters}
        setState={setState}
      />
    </Box>
  )
}

export default InProgressComponent
