import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  VStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoMdSwitch } from "@react-icons/all-files/io/IoMdSwitch";
import Completed from "../../../../images/Completed.svg";
import InProgress from "../../../../images/inProgress.svg";
import Reload from "../../../../images/icons/reload.svg";
import CloseIcon from "../../../../images/icons/close.svg";
import CheckMark from "../../../../images/icons/checkmark.svg";
import { CreateComment, ViewComments } from "../Comments";
import { TodoItemSubTask } from "../SubTasks";
import { TodoItemDependsOn } from "../TodoDependsOn";
import DeferTask from "../DeferTask";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import { server } from "../../../../utils/baseUrl";
import { Loader } from "../../../common";
import IsCreatedFromComment from "./isCreatedFromComment";

const TodoModal = (props) => {
  const [writeComment, setWriteComment] = useState(true);
  const [comments, setComments] = useState(props?.data?.comments);
  const apiBaseUrl = useBaseUrl();

  useEffect(() => {
    setComments(props?.data?.comments ?? []);
  }, [props?.data]);

  // Function to add a new comment to the comments array
  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const changeTaskRecurrence = (taskId) => {
    server
      .patch(`${apiBaseUrl}/todo/status/${taskId}`, {
        recurrence: "Once",
        completed: props.data.completed,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const statusImage = props.data.completed ? Completed : InProgress;
  // const keyword = props.data.tags;

  return (
    props.data !== undefined && (
      <Modal isOpen={props.showModal} onClose={props.CloseOrOpenModal} minW="80%" isCentered>
        <ModalOverlay />
        <ModalContent minW={["90%", "60%"]} fontFamily="Arial">
          {props.loading ? (
            <Loader />
          ) : (
            <>
              <ModalHeader>
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <Image src={statusImage} alt="status" w={24} />
                    {/* <Text color="black" ml={2}>
                      {keyword}
                    </Text> */}
                  </Flex>
                  <ModalCloseButton />
                </Flex>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <Box>
                  {/* Header Section */}
                  <Flex
                    mb={[2, 4]}
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      {props?.data?.tags && (
                        <Tag fontFamily="Arial" bg="lightgray">
                          {props?.data?.tags}
                        </Tag>
                      )}
                    </Box>

                    <Flex gap={6} justifyContent="left">
                      {props?.data?.priority && (
                        <VStack alignItems="flex-start">
                          <Text mb={0} fontFamily="IBM Plex Mono">
                            Priority
                          </Text>
                          <Text mb={0}>{props?.data?.priority}</Text>
                        </VStack>
                      )}
                      {props?.data?.recurrence && (
                        <VStack alignItems="flex-start">
                          <Text mb={0} fontFamily="IBM Plex Mono">
                            Recurrence
                          </Text>
                          <Text mb={0}>{props?.data?.recurrence}</Text>
                        </VStack>
                      )}
                    </Flex>
                  </Flex>

                  {/* Task Name */}
                  <Box
                    className="todoName"
                    onClick={() => onClickViewOneItem(props.data?.id)}
                    dangerouslySetInnerHTML={{ __html: props.data?.name }}
                  />

                  {/* Time Information */}
                  <Flex
                    flexDir="column"
                    className="todoItemTimeWrapper"
                    justifyContent="center"
                  >
                    {props.data && (
                      <div className="todoTime">
                        {props.data?.recurrence && (
                          <Flex alignItems="center">
                            <Text
                              mb={0}
                              fontFamily="Caveat"
                              pr={0}
                              mr={0}
                            >
                              Recurrence:
                            </Text>
                            <IconButton
                              aria-label="change-recurrence"
                              icon={<IoMdSwitch />}
                              h="fit-content"
                              w="fit-content"
                              m={0}
                              p={0}
                              bg="none"
                              onClick={() =>
                                changeTaskRecurrence(props.data.id)
                              }
                            />
                            <Text mb={0}>
                              {props.data?.recurrence ||
                                props.data?.duration}
                            </Text>
                          </Flex>
                        )}
                        {props.data?.startTime && (
                          <Flex mt={2} gap={4}>
                            <p>
                              <span>Start Time:</span>{" "}
                              <b>{moment(props.data?.startTime).format(
                                "MMM Do YYYY, h:mm a"
                              )}</b>
                            </p>
                            <p>
                              <span>End Time:</span>{" "}
                              <b>{moment(props.data?.endTime).format(
                                "MMM Do YYYY, h:mm a"
                              )}</b>
                            </p>
                          </Flex>
                        )}
                      </div>
                    )}
                    <p>
                      <span>Created On: &nbsp;</span>
                      {moment(props.data.createdAt).format(
                        "MMM Do YYYY, h:mm a"
                      )}
                    </p>
                  </Flex>

                  {/* Subtasks */}
                  {props.data?.subTasks?.length > 0 && (
                    <TodoItemSubTask subTasks={props.data?.subTasks} />
                  )}

                  {/* Depends On */}
                  {props.data?.dependsOn && (
                    <TodoItemDependsOn task={props.data?.dependsOn} />
                  )}

                  {/* Created From Comment */}
                  {props.data?.isCreatedFromComment && (
                    <IsCreatedFromComment data={props.data} onClickViewOneItem={() => onClickViewOneItem(props.data?.id)} />
                  )}

                  {/* Action Buttons */}
                  <Flex className="modalActionButtons" mt={4} mb={4} alignItems="center" gap={4}>
                    <Button
                      alignItems="center"
                      justifyContent="center"
                      className={`${
                        props.complete
                          ? "completedStatus"
                          : "ongoingStatus"
                      } btn btn-white btn-animate`}
                      onClick={() =>
                        props.editTodoItem({
                          id: props.data._id,
                          complete: props.complete,
                        })
                      }
                      fontWeight={700}
                    >
                      <Image
                        src={props.complete ? Reload : CheckMark}
                        alt="Add Todo"
                        mt={5}
                        mr={2}
                      />{" "}
                      {props.complete
                        ? "Revert to ongoing tasks"
                        : "Mark as complete"}
                    </Button>

                    <DeferTask
                      task={props.data}
                      closeTodoModal={props.CloseOrOpenModal}
                      setState={props.setState}
                    />
                    <Button
                      fontWeight={700}
                      alignItems="center"
                      className={`statusDeleteButton btn btn-white btn-animate`}
                      onClick={() =>
                        props.deleteTodoItem({
                          id: props.data._id,
                          complete: props.complete,
                        })
                      }
                    >
                      <Image src={CloseIcon} alt="Add Todo" mt={5} mr={2} /> Delete
                    </Button>
                    {!writeComment && (
                      <Button
                        variant="surface"
                        onClick={() => setWriteComment(true)}
                        bg="#5b60e9"
                      >
                        Comment
                      </Button>
                    )}
                  </Flex>

                  {/* Comments */}
                  {writeComment && (
                    <>
                      <CreateComment
                        setWriteComment={setWriteComment}
                        todo={props.data}
                        addComment={addComment}
                      />

                      {comments?.length > 0 && (
                        <ViewComments
                          todo={props?.data}
                          comments={comments}
                          setData={props?.setData}
                        />
                      )}
                    </>
                  )}
                </Box>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    )
  );
};

export default TodoModal;
