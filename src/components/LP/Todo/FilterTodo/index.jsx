import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormLabel, Button, Menu, MenuButton, MenuList, Checkbox, Stack, Select } from '@chakra-ui/react';
import { BsFilterLeft } from "@react-icons/all-files/bs/BsFilterLeft";

const recurrenceOptions = ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
const priorityOptions = ['No Priority', 'Low', 'Medium', 'High'];
const timeOptions = [
  { label: 'All', value: 0 },
  { label: 'Last 24 hours', value: 24 },
  { label: 'Last 48 hours', value: 48 },
  { label: 'Last 7 days', value: 7 * 24 },
  { label: 'Last 30 days', value: 30 * 24 },
  { label: 'Last 1 year', value: 365 * 24 },
];

const FilterTodo = ({ onFilterChange, onClearFilters, activeTodoSection }) => {
  const [selectedRecurrence, setSelectedRecurrence] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [selectedTime, setSelectedTime] = useState(activeTodoSection ? 24 : 0); // Default to Last 24 hours

  const handleRecurrenceChange = (value) => {
    const updatedRecurrence = selectedRecurrence.includes(value)
      ? selectedRecurrence.filter((item) => item !== value)
      : [...selectedRecurrence, value];

    setSelectedRecurrence(updatedRecurrence);
    onFilterChange({ recurrence: updatedRecurrence, priority: selectedPriority, time: selectedTime });
  };

  const handlePriorityChange = (value) => {
    const updatedPriority = selectedPriority.includes(value)
      ? selectedPriority.filter((item) => item !== value)
      : [...selectedPriority, value];

    setSelectedPriority(updatedPriority);
    onFilterChange({ recurrence: selectedRecurrence, priority: updatedPriority, time: selectedTime });
  };

  const handleTimeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedTime(value);
    onFilterChange({ recurrence: selectedRecurrence, priority: selectedPriority, time: value });
  };

  const clearFilters = () => {
    setSelectedRecurrence([]);
    setSelectedPriority([]);
    setSelectedTime(activeTodoSection ? 24 : 0); // Reset to Last 24 hours
    onClearFilters();
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        _focus={{ boxShadow: 'outline' }}
        h="auto"
        minW="fit-content"
        p={0}
        mr={2}
        rightIcon={<BsFilterLeft size={24} />}
      />
      <MenuList bg="white" boxShadow="md" p={4} borderRadius="md" fontFamily="arial">
        {/* Time Filter */}
        <Box mb={4}>
          <FormLabel fontWeight={600}>Time/Date</FormLabel>
          <Select value={selectedTime} onChange={handleTimeChange} bg="white">
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        {/* Recurrence Filter */}
        <Box mb={4}>
          <FormLabel fontWeight={600}>Recurrence</FormLabel>
          <Stack>
            {recurrenceOptions.map((option) => (
              <Checkbox
                key={option}
                isChecked={selectedRecurrence.includes(option)}
                onChange={() => handleRecurrenceChange(option)}
              >
                {option}
              </Checkbox>
            ))}
          </Stack>
        </Box>

        {/* Priority Filter */}
        <Box mb={4}>
          <FormLabel fontWeight={600}>Priority</FormLabel>
          <Stack>
            {priorityOptions.map((option) => (
              <Checkbox
                key={option}
                isChecked={selectedPriority.includes(option)}
                onChange={() => handlePriorityChange(option)}
              >
                {option}
              </Checkbox>
            ))}
          </Stack>
        </Box>

        {/* Clear Filters Button */}
        {(selectedRecurrence.length || selectedPriority.length || selectedTime !== 24) && (
          <Button
            colorScheme="blue"
            variant="outline"
            width="full"
            onClick={clearFilters}
            size="sm"
          >
            Clear Filters
          </Button>
        )}
      </MenuList>
    </Menu>
  );
};

FilterTodo.propTypes = {
  onFilterChange: PropTypes.func.isRequired, // Callback for when filters change
  onClearFilters: PropTypes.func.isRequired, // Callback to clear filters
};

export default FilterTodo;
