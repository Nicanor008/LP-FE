import React from 'react'
import { Flex, IconButton, Text } from "@chakra-ui/react"
import { FaCheck } from "@react-icons/all-files/fa/FaCheck"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"
import { server } from "../../../../../utils/baseUrl"

const TodoItemSubTask = ({ subTasks }) => {
    const apiBaseUrl = useBaseUrl()

    const markSubTaskAsDone = async (id) => {
        try {
          await server
            .patch(
                `${apiBaseUrl}/todo/status/${id}`,
                {
                completed: false,
                }
            )
          window.location.reload() // TEMP: until i find a fix to refresh data without page refresh
        } catch (e) {
          console.log('error encountered on marking sub task as done, ', e)
        }
      }

    return (
        <Flex flexDir="column" gap={2}  w="80%" right={0} mb={2}>
            <Text m={0} p={0} fontWeight={600} fontSize="sm">Sub Tasks:</Text>
            {subTasks?.map((subTask) => (
              <Flex key={subTask?._id} p={1} w="100%" bg="gray.100" borderRadius="md" alignItems="center">
                {!subTask?.completed && (
                  <IconButton
                    aria-label="mark-subtask-done"
                    icon={<FaCheck />}
                    onClick={() => !subTask?.completed ? markSubTaskAsDone(subTask?._id) : null}
                    color="#5b60e9"
                    m={0}
                    p={0}
                  />
                )}
                <Text
                  mb={0}
                  textDecoration={subTask?.completed ? "line-through" : "none"}
                  pl={subTask?.completed ? 10 : 0}
                  cursor="default"
                >
                  {subTask.name}
                </Text>
              </Flex>
            ))}
          </Flex>
    )
}

export default TodoItemSubTask
