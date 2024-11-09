import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Accordion,
  VStack,
  HStack
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import moment from "moment"
import Modal from "../../../common/modal"
import Completed from "../../../../images/Completed.svg"
import InProgress from "../../../../images/inProgress.svg"
import Reload from "../../../../images/icons/reload.svg"
import Close from "../../../../images/icons/close.svg"
import CheckMark from "../../../../images/icons/checkmark.svg"
import { CreateComment, ViewComments } from "../Comments"
import { TodoItemSubTask } from "../SubTasks"

const TodoModal = ( props ) => {
  const [writeComment, setWriteComment] = useState(true)
  const [comments, setComments] = useState(props?.data?.comments);

  useEffect(() => {
    setComments(props?.data?.comments ?? [])
  }, [props?.data])

  // Function to add a new comment to the comments array
  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    props.data !== undefined && (
      <Modal
        loading={props.loading}
        showModal={props.showModal}
        onClickClose={props.CloseOrOpenModal}
        statusImage={props.data.completed ? Completed : InProgress}
        keyword={props.data.tags}
      >
        <div>
          <div className="modalChildren">
            <Flex mb={[2, 4]} w="100%" justifyContent="space-between" alignItems="center">
              <Box>
              {props?.data?.tags && (
                <Tag fontFamily="Arial" bg="lightgray">{props?.data?.tags}</Tag>
              )}
              </Box>

              <Flex gap={6} justifyContent="left">
                {props?.data?.priority && (
                  <VStack alignItems="flex-start">
                    <Text mb={0} fontFamily="IBM Plex Mono">Priority</Text>
                    <Text mb={0}>{props?.data?.priority}</Text>
                  </VStack>
                )}
                {props?.data?.recurrence && (
                  <VStack alignItems="flex-start">
                    <Text mb={0} fontFamily="IBM Plex Mono">Recurrence</Text>
                    <Text mb={0}>{props?.data?.recurrence}</Text>
                  </VStack>
                )}
              </Flex>
            </Flex>
            <Box
              className="todoName"
              onClick={() => onClickViewOneItem(props.data?.id)}
              dangerouslySetInnerHTML={{ __html: props.data?.name }}
            />

            {/* time */}
            <Flex flexDir="column" className="todoItemTimeWrapper" justifyContent="center">
              {props.data && (
                <div className="todoTime">
                  {props.data?.recurrence && (
                    <p>
                      <span>Recurrence:</span>{" "}{props.data?.recurrence || props.data?.duration}
                    </p>
                  )}
                  {props.data?.startTime && (
                    <>
                      <p>
                        <span>Start Time:</span>{" "}{moment(props.data?.startTime).format("MMM Do YYYY, h:mm a")}
                      </p>
                      <p>
                        <span>End Time:</span>{" "}{moment(props.data?.endTime).format("MMM Do YYYY, h:mm a")}
                      </p>
                    </>
                  )}
                </div>
              )}
              <p>
                <span>Created On: &nbsp;</span>
                {moment(props.data.createdAt).format("MMM Do YYYY, h:mm a")}
              </p>
            </Flex>

            {/* sub tasks */}
            {props.data?.subTasks?.length > 0 && <TodoItemSubTask subTasks={props.data?.subTasks} />}

            {/* if it was created from comment, then show the parent todo item */}
            {props.data?.isCreatedFromComment && (
              <Accordion allowToggle mb={4} bg="gray.100" borderRadius="lg">
                <AccordionItem border="none">
                  <AccordionButton bg="none" fontSize="sm" color="gray.500">This Task was created from a comment, view parent task</AccordionButton>
                  <AccordionPanel>
                    <Text textTransform="capitalize">{props.data?.createdFromComment?.name}</Text>
                    <Flex gap={4}>
                      {props.data?.createdFromComment?.priority && (
                        <HStack>
                          <Text mb={0} fontFamily="IBM Plex Mono" fontSize="sm">Priority:</Text>
                          <Text mb={0}>{props.data?.createdFromComment?.priority}</Text>
                        </HStack>
                      )}
                      {props.data?.createdFromComment?.recurrence && (
                        <HStack>
                          <Text mb={0} fontFamily="IBM Plex Mono" fontSize="sm">Recurrence:</Text>
                          <Text mb={0}>{props.data?.createdFromComment?.recurrence}</Text>
                        </HStack>
                      )}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}

            {/* action buttons */}
            <div className="modalActionButtons">
              <Button
                alignItems="center"
                className={`${
                    props.complete ? "completedStatus" : "ongoingStatus"
                } btn btn-white btn-animate`}
                onClick={() =>
                  props.editTodoItem({
                    id: props.data._id,
                    complete: props.complete,
                  })
                }
                fontWeight={700}
              >
                <img src={props.complete ? Reload : CheckMark} alt="Add Todo" />{" "}
                {props.complete
                  ? "Revert to ongoing tasks"
                  : "Mark as complete"}
              </Button>
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
                <img src={Close} alt="Add Todo" /> Delete
              </Button>
              {!writeComment && (
                <Button variant="surface" onClick={() => setWriteComment(true)} bg="#5b60e9" >
                  Comment
                </Button>
              )}
            </div>

            {/* comments */}
            {writeComment && (
              <>
                <CreateComment setWriteComment={setWriteComment} todo={props.data} addComment={addComment} />

                {comments?.length > 0 && <ViewComments todo={props?.data} comments={comments} setData={props?.setData} />}
              </>
            )}
          </div>
        </div>
      </Modal>
    )
  )
}

export default TodoModal
