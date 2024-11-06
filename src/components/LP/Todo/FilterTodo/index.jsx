import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormLabel, Button, Menu, MenuButton, MenuList, Checkbox, Stack } from '@chakra-ui/react';
import { BsFilterLeft } from "@react-icons/all-files/bs/BsFilterLeft"


const recurrenceOptions = ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
const priorityOptions = ['No Priority', 'Low', 'Medium', 'High'];


const FilterTodo = ({ onFilterChange, onClearFilters }) => {
  const [selectedRecurrence, setSelectedRecurrence] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);

  const handleRecurrenceChange = (value) => {
    const updatedRecurrence = selectedRecurrence.includes(value)
      ? selectedRecurrence.filter((item) => item !== value)
      : [...selectedRecurrence, value];

    setSelectedRecurrence(updatedRecurrence);
    onFilterChange({ recurrence: updatedRecurrence, priority: selectedPriority });
  };

  const handlePriorityChange = (value) => {
    const updatedPriority = selectedPriority.includes(value)
      ? selectedPriority.filter((item) => item !== value)
      : [...selectedPriority, value];

    setSelectedPriority(updatedPriority);
    onFilterChange({ recurrence: selectedRecurrence, priority: updatedPriority });
  };

  const clearFilters = () => {
    setSelectedRecurrence('');
    setSelectedPriority('');
    onClearFilters(); // Clear filters in parent
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
          {(selectedRecurrence.length || selectedPriority.length) ? (
            <Button
                colorScheme="blue"
                variant="outline"
                width="full"
                onClick={clearFilters}
                size="sm"
            >
                Clear Filters
            </Button>
          ): ""}
        </MenuList>
      </Menu>
  );
};

FilterTodo.propTypes = {
  onFilterChange: PropTypes.func.isRequired, // Callback for when filters change
  onClearFilters: PropTypes.func.isRequired, // Callback to clear filters
};

export default FilterTodo;
