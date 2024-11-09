import { Box, Checkbox, Flex, FormControl, FormLabel, IconButton, Input, Radio, RadioGroup, Select, Stack, VStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from "@react-icons/all-files/fa/FaPlus"
import Plus from '../../../../../images/icons/plus.svg';
import { AddTodoButton, RichTextArea } from '../../../../common';
import DurationSelector from './DurationSelector';
import { server } from '../../../../../utils/baseUrl';
import { useBaseUrl } from '../../../../../hooks/useBaseUrl';

const CreateTodoInputs = ({ onClickAddTodoButton, register, control, loading, activeCreateTodoOption, watch, subTasks, setSubTasks }) => {
  const textareaRef = useRef(null);
  const todoDescription = watch("name");
  const [tasks, setTasks] = useState([]);
  const apiBaseUrl = useBaseUrl()

  const getOngoingTodo = async () => {
    try {
      const response = await server
        .get(`${apiBaseUrl}/todo/ongoing`)

      setTasks(response.data?.data)
    }
    catch (e) {
      setData([])
      setOngoingLoader(false)
    }
  }

  const onKeyDownTodoHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();  // Prevent new line
      onClickAddTodoButton();  // Trigger form submission
    }
  };

  // Auto-expand the textarea as the content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to shrink if needed
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`; // Set a maximum height
    }
  }, [todoDescription]);

  const [showSubTaskInput, setShowSubTaskInput] = useState(false);
  const [subTaskInput, setSubTaskInput] = useState("");

  useEffect(() => {
    getOngoingTodo();
  }, []);

  const handleSubTaskAdd = () => {
    if (subTaskInput.trim()) {
      setSubTasks([...subTasks, subTaskInput]);
      setSubTaskInput("");
    }
  };

  const handleSubTaskInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubTaskAdd();
    }
  };

  return (
    <Box fontFamily="'IBM Plex Mono', monospace">
      {activeCreateTodoOption !== 'Basic' && (
        <FormControl mb={0}>
          <FormLabel htmlFor="tags" fontWeight={700}>Tags</FormLabel>
          <Input
            type="text"
            placeholder="Tags"
            className="input"
            {...register("tags")}
          />
        </FormControl>
      )}
      
      <FormControl mb={0}>
        <FormLabel htmlFor="name" fontWeight={700}>Todo Description</FormLabel>
        <Flex align="center" w="100%">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <>
                <RichTextArea
                  name="name"
                  control={control}
                  placeholder="Todo Description"
                  onKeyDown={onKeyDownTodoHandler}
                  {...field}
                />
              </>
            )}
          />
        </Flex>
      </FormControl>

      {/* sub tasks */}
      {/* a checkbox, when selected opens up an input to enter subtask name/description, on press enter creates sub-task related to the task to be created(or collect all sub-tasks then on creating task, also create sub-task)*/}
      <FormControl mb={4}>
        <Checkbox
          onChange={(e) => setShowSubTaskInput(e.target.checked)}
        >
          Add Sub-tasks
        </Checkbox>
      </FormControl>

      {showSubTaskInput && (
        <VStack align="start" spacing={2} mt={2}>
          <Flex align="center" w="100%">
            <Input
              placeholder="Enter sub-task"
              value={subTaskInput}
              onChange={(e) => setSubTaskInput(e.target.value)}
              onKeyDown={handleSubTaskInputKeyDown}
            />
            <IconButton
              icon={<FaPlus />}
              onClick={handleSubTaskAdd}
              aria-label="Add sub-task"
              ml={2}
            />
          </Flex>

          {/* Display sub-tasks */}
          {subTasks.map((subTask, index) => (
            <Box key={index} p={2} w="100%" bg="gray.100" borderRadius="md">
              {subTask}
            </Box>
          ))}
        </VStack>
      )}

      {/* Duration */}
      {activeCreateTodoOption === 'Advanced' && (
        <DurationSelector register={register} watch={watch} />
      )}

      {/* Time details */}
      {activeCreateTodoOption === 'Advanced' && (
        <Flex className="timeDurationWrapper" wrap="wrap" w="100%" alignItems="center" gap={4} mb={3}>
          <FormControl mb={0} className="time" w="fit-content">
            <FormLabel htmlFor="startTime" fontWeight={700}>Start Time</FormLabel>
            <Input
              type="datetime-local"
              {...register("startTime")}
            />
          </FormControl>

          <FormControl mb={0} className="time" w="fit-content">
            <FormLabel htmlFor="endTime" fontWeight={700}>End Time</FormLabel>
            <Input
              type="datetime-local"
              {...register("endTime")}
            />
          </FormControl>

          {/* {watch("recurrence") && (
            <VStack alignItems="left">
              <Box fontWeight={700}>Duration</Box>
              <Text>{watch("recurrence")}</Text>
            </VStack>
          )} */}
        </Flex>
      )}

      <Flex justifyContent="space-between" flexDir={["column", "row"]}>
        {activeCreateTodoOption === 'Advanced' && (
          <>
            <FormControl mb={4} w="fit-content">
              <FormLabel fontWeight={700}>Priority Level</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio value="High" {...register("priority")} name="priority">High</Radio>
                  <Radio value="Medium" {...register("priority")} name="priority">Medium</Radio>
                  <Radio value="Low" {...register("priority")} name="priority">Low</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* task dependency */}
            <FormControl mb={4} color="black" w={["100%", "50%"]}>
              <FormLabel fontWeight={700}>Depends on</FormLabel>
              <Select
                placeholder="Select a task"
                {...register("dependsOn")}
              >
                {tasks.map((task) => (
                  <option
                    key={task._id}
                    value={task._id}
                    dangerouslySetInnerHTML={{ __html: task.name }}
                  />
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </Flex>

      {/* Submit button */}
      <AddTodoButton
        name="Add Todo"
        classButtonName="button"
        onclick={onClickAddTodoButton}
        icon={Plus}
        loading={loading}
      />
    </Box>
  );
};

CreateTodoInputs.propTypes = {
  onClickAddTodoButton: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  activeCreateTodoOption: PropTypes.string,
  watch: PropTypes.func.isRequired,
};

export default CreateTodoInputs;
