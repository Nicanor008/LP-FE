import React from 'react'
import { Box, Text, Flex } from "@chakra-ui/react"

const TodoItemDependsOn = ({ task }) => {
    return (
        <Flex w="100%" flexDir="column" mb={4}>
            <Text fontWeight={600} mb={2}>Depends on</Text>
            <Box
                bg="gray.100"
                p={2}
                pb={0}
                mb={0} borderRadius={5}
                dangerouslySetInnerHTML={{ __html: task.name }}
            />
        </Flex>
    )
}

export default TodoItemDependsOn
