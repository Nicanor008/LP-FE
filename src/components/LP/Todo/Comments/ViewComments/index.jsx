import React from 'react';
import { Text, Stack, Box, Flex } from "@chakra-ui/react";
import { ChakraButton } from '../../../../common/buttons/ChakraButton';
import { server } from '../../../../../utils/baseUrl';
import { useBaseUrl } from '../../../../../hooks/useBaseUrl';

const ViewComments = ({ comments, setData }) => {
    const apiBaseUrl = useBaseUrl()

  const OnDeleteComment = async (comment) => {
    try {
        await server.patch(`${apiBaseUrl}/todo/comments/archive/${comment?._id}`)

        await server.get(`${apiBaseUrl}/todo/${comment?.todo}`).then(item => {
            setData(item.data.data)
          })
    } catch (e) {
        console.error('Error ', e.message)
    }
  }

  return (
    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md" fontFamily="IBM Plex Mono">
      <Stack spacing={3}>
        {comments?.map((comment) => (
          <Box key={comment._id} px={4} pt={4} bg="white" borderRadius="sm">
            <Text fontSize="md" mb={1}>{comment?.comment}</Text>
            <Text fontSize="sm" color="gray.400" mb={0}>
              {new Date(comment?.createdAt).toLocaleString("en-US", {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Flex gap={3} py={3} flexDir={["column", "row"]}>
                <ChakraButton>Create New Todo</ChakraButton>
                <ChakraButton>Update to a Todo Item</ChakraButton>
                <ChakraButton bg="red" color="white" onClick={() => OnDeleteComment(comment)}>Delete</ChakraButton>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ViewComments;
