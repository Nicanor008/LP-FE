import React from 'react';
import PropTypes from 'prop-types';
import Plus from '../../../../../images/icons/plus.svg';
import { AddTodoButton } from '../../../../common';
import DurationSelector from './DurationSelector';
import { Box, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';

const CreateTodoInputs = ({ onClickAddTodoButton, register, loading, activeCreateTodoOption, watch }) => {
  const onKeyDownTodoHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();  // Prevent new line
      onClickAddTodoButton();  // Trigger form submission
    }
  }
  return (
    <Box fontFamily="'IBM Plex Mono', monospace">
      {activeCreateTodoOption !== 'Basic' && (
      <FormControl mb={0}>
        <FormLabel htmlFor="name" fontWeight={700}>Tags</FormLabel>
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
        <Input
          type="text"
          placeholder="Todo Description"
          className="input"
          onKeyDown={onKeyDownTodoHandler}
          {...register("name")}
        />
      </FormControl>

      {/* Duration */}
      {activeCreateTodoOption === 'Advanced' && (
        <DurationSelector register={register} watch={watch} />
      )}

      {/* time details */}
      {activeCreateTodoOption === 'Advanced' && (
        <Flex className="timeDurationWrapper" wrap="wrap" w="100%" alignItems="center" gap={4}>
          <FormControl mb={0} className="time" w="fit-content">
            <FormLabel htmlFor="name" fontWeight={700}>Start Time</FormLabel>
            <Input
              type="datetime-local"
              {...register("startTime")}
            />
          </FormControl>

          <FormControl mb={0} className="time" w="fit-content">
            <FormLabel htmlFor="name" fontWeight={700}>End Time</FormLabel>
            <Input
              type="datetime-local"
              {...register("endTime")}
            />
          </FormControl>

          {watch("recurrence") && (
            <VStack alignItems="left">
              <Box fontWeight={700}>Duration</Box>
              <Text>
                {watch("recurrence")}
              </Text>
            </VStack>
          )}
        </Flex>
      )}

      {activeCreateTodoOption === 'Advanced' && (
        <FormControl mb={4}>
          <FormLabel fontWeight={700}>Priority Level</FormLabel>
          <RadioGroup>
            <Stack direction="row">
              <Radio value="High"  {...register("priority")} name="priority">High</Radio>
              <Radio value="Medium"  {...register("priority")} name="priority">Medium</Radio>
              <Radio value="Low"  {...register("priority")} name="priority">Low</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )}

      {/* submit button */}
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
};

export default CreateTodoInputs;
