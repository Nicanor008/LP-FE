import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  List,
  ListItem,
  Text,
  Button,
} from "@chakra-ui/react";
import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import TodoModal from "../../TodoModal";

const SearchTodoByName = ({ tasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter tasks based on the search term
    const results = tasks.filter((task) =>
      task.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTasks(results);
  };

  const cleanAndTruncateHTML = (html, maxLength = 50) => {
    // Remove HTML tags and trim whitespace
    const plainText = html.replace(/<p><br\s*\/?><\/p>/g, '').trim();
    
    // Truncate to the specified max length and add ellipsis if necessary
    return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
  };

  const onClickTaskHandler = (task) => {
    setSelectedTask(task)
    onClose()
    setShowModal(true)
    setSearchTerm("")
    setTimeout(() => {
        setFilteredTasks(null)
    }, 1000);
  }

  return (
    <Box>
      {/* Search Icon Button */}
      <IconButton
        icon={<BiSearchAlt size={24} />}
        onClick={onOpen}
        aria-label="Search tasks"
        bg="transparent"
        h="auto"
        minW="auto"
        _hover={{
            bg: 'transparent'
        }}
      />

      {/* Search Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent fontFamily="arial">
          <ModalHeader>Search {tasks[0]?.completed ? 'Completed' : 'In-Progress'} Tasks</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Search by task name..."
              value={searchTerm}
              onChange={handleSearch}
              mb={4}
            />

            {/* Display Filtered Results */}
            {filteredTasks?.length > 0 ? (
              <List m={0}>
                {filteredTasks?.map((task) => (
                  <ListItem
                    key={task._id}
                    borderBottom="0.2px solid"
                    borderColor="gray.100"
                    pb={2}
                    as={Button}
                    onClick={() => onClickTaskHandler(task)}
                    bg="inherit"
                    _hover={{ bg: "transparent"}} w="100%"
                  >
                    <Flex align="center" justify="space-between" w="100%">
                      <Box
                        bg="inherit"
                        cursor="pointer"
                        fontSize="initial"
                        fontFamily="IBM Plex Mono"
                        dangerouslySetInnerHTML={{ __html: cleanAndTruncateHTML(task.name) }}
                    />
                    </Flex>
                  </ListItem>
                ))}
              </List>
            ) : (
              searchTerm && <Text>No tasks found for "{searchTerm}"</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {showModal && (
        <TodoModal
          data={selectedTask}
        //   loading={true}
          CloseOrOpenModal={() => setShowModal(!showModal)}
          showModal={showModal}
          complete={selectedTask?.completed}
          id={selectedTask?._id}
        //   editTodoItem={selectedTask.editTodoItem}
        //   deleteTodoItem={selectedTask.deleteTodoItem}
        //   setData={setData}
        />
      )}
    </Box>
  );
};

export default SearchTodoByName;
