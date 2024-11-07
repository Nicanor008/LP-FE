import React from 'react';
import { Button, Center, Text, VStack } from "@chakra-ui/react"

const FiltersNotFound = ({ onClick, noTaskCompletedWith24Hours = false }) => (
    <Center>
      <VStack w={["100%", "70%"]} gap={2} textAlign="center" mb={2}>
        <Text fontWeight={700} fontSize="lg" mb={0}>No Tasks {noTaskCompletedWith24Hours ? 'Completed in 24 hours' : 'found'}</Text>
        <Text fontSize="sm" mb={0}>
          {noTaskCompletedWith24Hours 
            ? `You haven\'t finished any task in the last 24 hours, you can apply the filters above to see tasks finished in other passt time` 
            : `The filters applied did not return any data, check on the filters and try again`
          }
        </Text>
        {!noTaskCompletedWith24Hours && (
          <Button
            onClick={onClick}
            bg="#9ea3f6"
            variant="primary"
            size="sm"
            color="black"
            fontWeight={800}
          >
            Clear Filters
          </Button>
        )}
      </VStack>
    </Center>
)

export default FiltersNotFound
