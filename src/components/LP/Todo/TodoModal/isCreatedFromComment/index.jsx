import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const IsCreatedFromComment = ({ data, onClickViewOneItem }) => {
    return (
        <Accordion
            allowToggle
            mb={4}
            bg="gray.100"
            borderRadius="lg"
        >
            <AccordionItem border="none">
            <AccordionButton
                bg="none"
                fontSize="sm"
                color="gray.500"
            >
                This Task was created from a comment, view parent
                task
            </AccordionButton>
            <AccordionPanel>
                <Box
                    bg="inherit"
                    m={0}
                    cursor="pointer"
                    fontSize="initial"
                    fontFamily="IBM Plex Mono"
                    onClick={onClickViewOneItem}
                    dangerouslySetInnerHTML={{
                        __html: data?.createdFromComment?.name,
                    }}
                    color="black"
                    fontWeight={600}
                />
                <Flex gap={4}>
                    {data?.createdFromComment?.priority && (
                        <HStack>
                        <Text
                            mb={0}
                            fontFamily="IBM Plex Mono"
                            fontSize="sm"
                        >
                            Priority:
                        </Text>
                        <Text mb={0}>
                            {data?.createdFromComment?.priority}
                        </Text>
                        </HStack>
                    )}
                    {data?.createdFromComment?.recurrence && (
                        <HStack>
                        <Text
                            mb={0}
                            fontFamily="IBM Plex Mono"
                            fontSize="sm"
                        >
                            Recurrence:
                        </Text>
                        <Text mb={0}>
                            {data?.createdFromComment?.recurrence}
                        </Text>
                        </HStack>
                    )}
                </Flex>
            </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default IsCreatedFromComment
