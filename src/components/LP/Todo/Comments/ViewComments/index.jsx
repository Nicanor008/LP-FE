import React, { useState } from 'react';
import { Text, Stack, Box, Flex } from "@chakra-ui/react";
import { jwtDecode } from 'jwt-decode';
import { ChakraButton } from '../../../../common/buttons/ChakraButton';
import { server } from '../../../../../utils/baseUrl';
import { useBaseUrl } from '../../../../../hooks/useBaseUrl';

const ViewComments = ({ todo, comments, setData }) => {
    const apiBaseUrl = useBaseUrl()
    const [createNewTodo, setCreateNewTodo] = useState(false)

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

  const createNewTodoHandler = (comment) => {
    setCreateNewTodo(true)
    const token = localStorage.getItem("token");

    const activeToken = token && jwtDecode(token.slice(7));
    try {
        server
            .post(`${apiBaseUrl}/todo/comments/create-todo-from-comment`, 
                { 
                    todoCommentId: comment?._id,
                    name: comment?.comment, 
                    createdFromComment: todo?._id,
                    tags: todo?.tags,
                    user: activeToken?.id
                })
            .then(async () => {
                setCreateNewTodo(false)
                window.location.reload()
            })
            .catch(function (error) {
                alert(error?.response?.data?.message)
                setCreateNewTodo(false)
            }
        )
    } catch (e) {
        alert(e?.response?.data?.message)
        setCreateNewTodo(false)
    }
  }

  return (
    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md" fontFamily="IBM Plex Mono">
      <Stack spacing={3}>
        {comments?.map((comment) => (
          <Box key={comment._id} px={4} pt={4} bg="white" borderRadius="sm">
            {/* <Text fontSize="md" mb={1}>{comment?.comment}</Text> */}
            <Box
                bg="inherit"
                m={0}
                cursor="pointer"
                fontSize="initial"
                fontFamily="IBM Plex Mono"
                onClick={() => onClickViewOneItem(props.id)}
                dangerouslySetInnerHTML={{ __html: comment?.comment }}
            />

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
                <ChakraButton onClick={() => createNewTodoHandler(comment)} isLoading={createNewTodo}>Create New Todo</ChakraButton>
                {/* TODO: to work on this logic later, doesn't seem ideal now */}
                {/* <ChakraButton onClick={() => updateCommentToMainTodoItem(comment)}>Update to a Todo Item</ChakraButton> */}
                <ChakraButton bg="red" color="white" onClick={() => OnDeleteComment(comment)}>Delete</ChakraButton>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ViewComments;
