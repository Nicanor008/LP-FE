import React, { useEffect, useState } from 'react';
import {
  Flex,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

const DurationSelector = ({ register, watch }) => {
  const [currentQuarter, setCurrentQuarter] = useState('');

  // Function to calculate the current quarter and year
  const getCurrentQuarter = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Months are zero-indexed (0-11)
    const quarter = Math.floor(month / 3) + 1;
    return { quarter: `Q${quarter}`, year };
  };

  useEffect(() => {
    const { quarter, year } = getCurrentQuarter();
    setCurrentQuarter(`${quarter}, ${year}`);
  }, []);

  const selectedDuration = watch("recurrence"); // Track changes in "recurrence"

  return (
    <Flex direction="row" alignItems="center" w="100%">
      <FormControl as="fieldset" rounded={5} pt={1} pb={4} px={4} mb={2}>
        <FormLabel as="legend" fontWeight={700}>Recurrence</FormLabel>
        <RadioGroup value={selectedDuration}>
          <Flex wrap="wrap">
            <Radio value="Once" mr={[2, 3]} {...register("Once")} name="recurrence">Once</Radio>
            <Radio value="Daily" mr={[2, 3]} {...register("recurrence")} name="recurrence">Daily</Radio>
            <Radio value="Weekly" mr={[2, 3]} {...register("recurrence")} name="recurrence">Weekly</Radio>
            <Radio value="Monthly" mr={[2, 3]} {...register("recurrence")} name="recurrence">Monthly</Radio>
            <Radio value={currentQuarter} mr={[2, 3]} {...register("recurrence")} name="recurrence">Quarterly</Radio>
            <Radio value="Yearly" mr={[2, 3]} {...register("recurrence")} name="recurrence">Yearly</Radio>
          </Flex>
        </RadioGroup>
      </FormControl>
    </Flex>
  );
};

export default DurationSelector;
