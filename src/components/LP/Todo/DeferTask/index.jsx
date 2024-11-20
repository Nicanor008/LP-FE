import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    useToast,
    useDisclosure,
    Box
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useBaseUrl } from '../../../../hooks/useBaseUrl';
import { server } from '../../../../utils/baseUrl';

const DeferTask = ({ task, closeTodoModal, setState }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deferredTo, setDeferredTo] = useState('');
  const [reason, setReason] = useState('');
  const toast = useToast();
  const apiBaseUrl = useBaseUrl()

  const handleDeferTask = async () => {
    try {
      const response = await server.post(`${apiBaseUrl}/todo/defer`, { taskId: task.id, deferredTo, reason })
      toast({ title: response.data.message, status: 'success', duration: 3000, isClosable: true });
      onClose();
      closeTodoModal()
      setState((prevState) => ({
        ...prevState,
        newDataAdded: !prevState.newDataAdded
      }))
    } catch (error) {
      toast({
        title: 'Error deferring task',
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box fontFamily="Arial">
        <Button bg="none" color="black" border="1px solid" borderColor="#9ea3f6" onClick={onOpen}>
            Defer Task
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Defer Task</ModalHeader>
            <ModalBody>
            <Input
                type="datetime-local"
                value={deferredTo}
                onChange={(e) => setDeferredTo(e.target.value)}
                placeholder="Select future date and time"
                mb={4}
            />
            <Textarea
                placeholder="Reason for deferral (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDeferTask}>
                Defer Task
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </Box>
  );
};

export default DeferTask;
