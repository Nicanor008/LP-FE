import React from 'react';
import {jwtDecode} from "jwt-decode";
import { Box, Button, Flex, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { server } from '../../../../../utils/baseUrl';
import { useBaseUrl } from '../../../../../hooks/useBaseUrl';

const CreateComment = ({ setWriteComment, todo, addComment }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const toast = useToast();
  const apiBaseUrl = useBaseUrl()

  const submitComment = async (data) => {
    const token = localStorage.getItem("token");
    const activeToken = token && jwtDecode(token.slice(7));
    try {
      const response = await server.post(`${apiBaseUrl}/todo/${todo?.id}/comments`, {...data, userId: activeToken?.id, todoId: todo.id})

      addComment(response.data?.comment);

      reset();
      toast({
        title: 'Comment submitted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to submit comment.',
        description: error.message || "An error occurred.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onKeyDownComment = (e) => {
    // Check if Enter key is pressed without Shift
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();  // Prevent new line
        handleSubmit(submitComment)();  // Trigger form submission
      }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(submitComment)} p={4} my={2} fontFamily="arial">
      <FormControl isInvalid={errors.comment} mb={4}>
        <FormLabel htmlFor="comment">Comments</FormLabel>
        <Textarea
          id="comment"
          placeholder="Comment on the above todo item"
          onKeyDown={onKeyDownComment}
          {...register('comment', {
            required: 'Comment is required',
            minLength: { value: 3, message: 'Comment must be at least 3 characters' }
          })}
        />
        {errors.comment && (
          <Box color="red.500" mt={2}>
            {errors.comment.message}
          </Box>
        )}
      </FormControl>
      <Flex gap={2}>
        <Button variant="primary" type="submit" bg="#5b60e9" fontSize="sm" textTransform="capitalize">
            Comment
        </Button>

        <Button
            variant="primary"
            type="button"
            bg="lightgray"
            fontSize="sm"
            textTransform="capitalize"
            color="black"
            onClick={() => setWriteComment(false)}
        >
            Hide
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateComment;
