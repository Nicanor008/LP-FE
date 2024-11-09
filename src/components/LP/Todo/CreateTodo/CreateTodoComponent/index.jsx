import React, { useEffect, useState } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from "jwt-decode"
import CreateTodoInputs from '../CreateTodoInputs';
import Tabs from '../../tabs';
import { useBaseUrl } from '../../../../../hooks/useBaseUrl';
import WriteSmall from '../../../../../images/icons/write-small.svg';
import { server } from '../../../../../utils/baseUrl';

const CreateTodo = ({ setState, form }) => {
  const { register, handleSubmit, reset, watch, control, formState: { isSubmitting } } = useForm({
    defaultValues: {
      category: "",
      tags: "",
      name: "",
      startTime: "",
      endTime: "",
      duration: "",
      recurrence: "Once",
      priority: ""
    }
  });
  const apiBaseUrl = useBaseUrl();
  const [activeCreateTodoOption, setActiveCreateTodoOption] = useState('Medium');
  const toast = useToast();
  const [subTasks, setSubTasks] = useState([]);

  useEffect(() => {
    setActiveCreateTodoOption(sessionStorage.getItem("activeCreateTodoOption") ?? "Medium")
  }, [])

  const handleSelectActiveCreateTodoOption = (option) => {
    sessionStorage.setItem("activeCreateTodoOption", option)
    setActiveCreateTodoOption(option);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const activeToken = token && jwtDecode(token.slice(7));
    try {
      await server.post(`${apiBaseUrl}/todo`, {
        ...data,
        subTasks,
        duration: data?.recurrence ?? '',
        user: activeToken?.id
      })

      setSubTasks([])

      reset();
      setState({
        newDataAdded: !form.newDataAdded,
      })
      toast({
        title: 'Task Created Successully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setState({
        newDataAdded: !form.newDataAdded,
      })
    } catch (error) {
      toast({
        title: 'Failed to create task',
        description: error.message || "An error occurred.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onClickArrowOnCreateTodo = () => {
    if (typeof window !== "undefined") {
      setState((prevState) => ({
        ...prevState,
        showCreateTodo: !form.showCreateTodo,
      }));
    }
  };

  return (
    <Box mt={[1, 4]} className="FirstRowCreateTodo">
      <Tabs
        todoTitleIcon={WriteSmall}
        title="Write Todo"
        showBody={
          form.showCreateTodo === undefined
            ? true
            : form.showCreateTodo
          }
        onClickArrow={onClickArrowOnCreateTodo}
        handleSelectActiveCreateTodoOption={handleSelectActiveCreateTodoOption}
        activeCreateTodoOption={activeCreateTodoOption}
      >
        <CreateTodoInputs
          onClickAddTodoButton={handleSubmit(onSubmit)}
          register={register}
          loading={isSubmitting}
          activeCreateTodoOption={activeCreateTodoOption}
          watch={watch}
          control={control}
          subTasks={subTasks}
          setSubTasks={setSubTasks}
        />
      </Tabs>
    </Box>
  );
};

export default CreateTodo;
