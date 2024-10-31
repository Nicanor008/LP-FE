import React from 'react';
import { Text, Stack, Box } from "@chakra-ui/react";

const ViewComments = ({ comments }) => {
  return (
    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md" fontFamily="IBM Plex Mono">
      <Stack spacing={2}>
        {comments?.map((comment) => (
          <Box key={comment._id} px={4} pt={4} bg="white" borderRadius="sm">
            <Text fontSize="md" mb={1}>{comment?.comment}</Text>
            <Text fontSize="sm" color="gray.400">
              {new Date(comment?.createdAt).toLocaleString("en-US", {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ViewComments;
