import { Box, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Plus from '../../../../../images/icons/plus.svg';
import { AddTodoButton, RichTextArea } from '../../../../common';
import DurationSelector from './DurationSelector';

const CreateTodoInputs = ({ onClickAddTodoButton, register, control, loading, activeCreateTodoOption, watch }) => {
  const textareaRef = useRef(null);
  const todoDescription = watch("name");

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
        <RichTextArea
          name="name"
          control={control}
          placeholder="Todo Description"
          onKeyDown={onKeyDownTodoHandler}
        />
      </FormControl>

      {/* Duration */}
      {activeCreateTodoOption === 'Advanced' && (
        <DurationSelector register={register} watch={watch} />
      )}

      {/* Time details */}
      {activeCreateTodoOption === 'Advanced' && (
        <Flex className="timeDurationWrapper" wrap="wrap" w="100%" alignItems="center" gap={4}>
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

          {watch("recurrence") && (
            <VStack alignItems="left">
              <Box fontWeight={700}>Duration</Box>
              <Text>{watch("recurrence")}</Text>
            </VStack>
          )}
        </Flex>
      )}

      {activeCreateTodoOption === 'Advanced' && (
        <FormControl mb={4}>
          <FormLabel fontWeight={700}>Priority Level</FormLabel>
          <RadioGroup>
            <Stack direction="row">
              <Radio value="High" {...register("priority")} name="priority">High</Radio>
              <Radio value="Medium" {...register("priority")} name="priority">Medium</Radio>
              <Radio value="Low" {...register("priority")} name="priority">Low</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )}

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
