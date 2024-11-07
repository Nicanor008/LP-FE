import React, { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import moment from 'moment';
import CompletedTodoItems from '../CompletedTodoItems';
import { server } from '../../../../../utils/baseUrl';
import { useBaseUrl } from '../../../../../hooks/useBaseUrl';
import FilterTodo from '../../FilterTodo';

const CompletedTodoComponent = ({
  form,
  deleteTodoItem,
  editTodoItem,
  setState,
}) => {
  const [completedLoader, setCompletedLoader] = useState(false);
  const apiBaseUrl = useBaseUrl();
  const [completedData, setCompletedData] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [noTaskCompletedWith24Hours, setNoTaskCompletedWith24Hours] = useState(false)

  // Get completed todo data
  const getCompletedTodo = async () => {
    setCompletedLoader(true);
    try {
      const response = await server.get(`${apiBaseUrl}/todo/complete`);
      const data = response?.data || {};
      
      // Apply default 24-hour filter
      const filteredLast24Hours = filterByTime(data, 24);
      setIsFiltering(true);

      setCompletedLoader(false);
      setCompletedData(data);
      setFilteredTodos(filteredLast24Hours?.data?.length > 0 ? filteredLast24Hours : []);
    } catch (e) {
      setCompletedData([]);
      setFilteredTodos([]);
      setCompletedLoader(false);
    }
  };

  const filterByTime = (data, hours) => {
    const now = moment();

    const filteredData = data?.data?.filter((todo) =>
      moment(todo.updatedAt).isAfter(now.clone().subtract(hours, 'hours'))
    );

    const filteredKeywords = data?.groupedByKeywords?.map(([keyword, todos]) => {
      const filteredTodos = todos.filter((todo) =>
        moment(todo.updatedAt).isAfter(now.clone().subtract(hours, 'hours'))
      );
      return [keyword, filteredTodos];
    }).filter(([_, todos]) => todos.length > 0);

    const filteredPriority = data?.groupedByPriority?.map(([priorityGroup, todos]) => {
      const filteredTodos = todos.filter((todo) =>
        moment(todo.updatedAt).isAfter(now.clone().subtract(hours, 'hours'))
      );
      return [priorityGroup, filteredTodos];
    }).filter(([_, todos]) => todos.length > 0);

    // no data in the provided time frame
    if (filteredData?.length === 0) {
      setNoTaskCompletedWith24Hours(true)
      setIsFiltering(true)

      const response = {
        data: [],
        groupedByKeywords: [],
        groupedByPriority: []
      }
      setFilteredTodos(response)
      return response
    }
    setIsFiltering(true)

    setNoTaskCompletedWith24Hours(false)
    return {
      ...data,
      data: filteredData,
      groupedByKeywords: filteredKeywords,
      groupedByPriority: filteredPriority,
    };
  };

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

  const handleFilterChange = ({ recurrence, priority, time }) => {
    setIsFiltering(true);

    const now = moment();

    // Filter "data" section
    const filteredData = completedData?.data?.filter((todo) => {
      const matchesRecurrence =
        recurrence.length === 0 || (recurrence.includes('Once') && (todo.recurrence === '' || todo.recurrence === 'Once')) || recurrence.includes(todo.recurrence);

      const matchesPriority =
        priority.length === 0 || (priority.includes('No Priority') && (todo.priority === '' || todo.priority === 'No Priority')) || priority.includes(todo.priority);

      const matchesTime = moment(todo.updatedAt).isAfter(now.clone().subtract(time, 'hours'));

      return matchesRecurrence && matchesPriority && matchesTime;
    });

    // Filter grouped data similarly
    const filteredKeywords = completedData?.groupedByKeywords?.map(([keyword, todos]) => {
      const filteredTodos = todos.filter((todo) => {
        const matchesRecurrence =
          recurrence.length === 0 || (recurrence.includes('Once') && (todo.recurrence === '' || todo.recurrence === 'Once')) || recurrence.includes(todo.recurrence);

        const matchesPriority =
          priority.length === 0 || (priority.includes('No Priority') && (todo.priority === '' || todo.priority === 'No Priority')) || priority.includes(todo.priority);

        const matchesTime = moment(todo.updatedAt).isAfter(now.clone().subtract(time, 'hours'));

        return matchesRecurrence && matchesPriority && matchesTime;
      });

      return [keyword, filteredTodos];
    }).filter(([_, todos]) => todos.length > 0);

    const filteredPriority = completedData?.groupedByPriority?.map(([priorityGroup, todos]) => {
      const filteredTodos = todos.filter((todo) => {
        const matchesRecurrence =
          recurrence.length === 0 || (recurrence.includes('Once') && (todo.recurrence === '' || todo.recurrence === 'Once')) || recurrence.includes(todo.recurrence);

        const matchesPriority =
          priority.length === 0 || (priority.includes('No Priority') && (todo.priority === '' || todo.priority === 'No Priority')) || priority.includes(todo.priority);

        const matchesTime = moment(todo.updatedAt).isAfter(now.clone().subtract(time, 'hours'));

        return matchesRecurrence && matchesPriority && matchesTime;
      });

      return [priorityGroup, filteredTodos];
    }).filter(([_, todos]) => todos.length > 0);

    setFilteredTodos({
      ...completedData,
      data: filteredData,
      groupedByKeywords: filteredKeywords,
      groupedByPriority: filteredPriority,
    });
  };

  const handleClearFilters = () => {
    setIsFiltering(false);
    setFilteredTodos(filterByTime(completedData, 24)); // Reset to Last 24 Hours
  };

  useEffect(() => {
    getCompletedTodo();
  }, []);

  return (
    <Box className="thirdRowTodo">
      <CompletedTodoItems
        newData={form.newCompletedData}
        deleteTodoItem={deleteTodoItem}
        editTodoItem={editTodoItem}
        showBody={form.showCompletedTodo !== undefined ? form.showCompletedTodo : true}
        onClickArrow={onClickArrowOnCompletedTodo}
        data={filteredTodos?.data?.length || isFiltering ? filteredTodos.data ?? filteredTodos : completedData.data}
        dataInKeywords={filteredTodos?.data?.length || isFiltering ? filteredTodos.groupedByKeywords : completedData?.groupedByKeywords}
        loading={completedLoader}
        getCompletedTodo={getCompletedTodo}
        completedDataInPriority={filteredTodos?.data?.length || isFiltering ? filteredTodos.groupedByPriority : completedData?.groupedByPriority}
        filters={
          <FilterTodo
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeTodoSection={form.showCompletedTodo}
          />
        }
        isFiltering={isFiltering}
        handleClearFilters={handleClearFilters}
        noTaskCompletedWith24Hours={noTaskCompletedWith24Hours}
      />
    </Box>
  );
};

export default CompletedTodoComponent;
