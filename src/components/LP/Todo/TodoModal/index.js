import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import moment from "moment"
import Modal from "../../../common/modal"
import Completed from "../../../../images/Completed.svg"
import InProgress from "../../../../images/inProgress.svg"
import Reload from "../../../../images/icons/reload.svg"
import Close from "../../../../images/icons/close.svg"
import CheckMark from "../../../../images/icons/checkmark.svg"
import { CreateComment, ViewComments } from "../Comments"

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
            <p className="todoName">{props.data.name}</p>

            {/* time */}
            <div className="todoItemTimeWrapper">
              {props.data.duration && (
                <div className="todoTime">
                  <p>
                    <span>Duration:</span> &nbsp;{props.data.duration}
                  </p>
                  <p>
                    <span>Start Time:</span> &nbsp;{props.data.startTime}
                  </p>
                  <p>
                    <span>End Time:</span> &nbsp;{props.data.endTime}
                  </p>
                </div>
              )}
              <p>
                <span>Created On: &nbsp;</span>
                {moment(props.data.createdAt).format("MMM Do YYYY, h:mm a")}
              </p>
            </div>

            {/* action buttons */}
            <div className="modalActionButtons">
              <button
                className={`${
                    props.complete ? "completedStatus" : "ongoingStatus"
                } btn btn-white btn-animate`}
                onClick={() =>
                  props.editTodoItem({
                    id: props.data._id,
                    complete: props.complete,
                  })
                }
              >
                <img src={props.complete ? Reload : CheckMark} alt="Add Todo" />{" "}
                {props.complete
                  ? "Revert to ongoing tasks"
                  : "Mark as complete"}
              </button>
              <button
                className={`statusDeleteButton btn btn-white btn-animate`}
                onClick={() =>
                  props.deleteTodoItem({
                    id: props.data._id,
                    complete: props.complete,
                  })
                }
              >
                <img src={Close} alt="Add Todo" /> Delete
              </button>
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
