import React from "react";
import moment from "moment";
import Modal from "../../../common/modal";
import Completed from "../../../../images/Completed.svg";
import InProgress from "../../../../images/inProgress.svg";
import Reload from "../../../../images/icons/reload.svg";
import Close from "../../../../images/icons/close.svg";
import CheckMark from "../../../../images/icons/checkmark.svg";

const TodoModal = (props,) => (
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
                  <span>Duration:</span>
                  {" "}
                  {props.data.duration}
                </p>
                <p>
                  <span>Start Time:</span>
                  {" "}
                  {props.data.startTime}
                </p>
                <p>
                  <span>End Time:</span>
                  {" "}
                  {props.data.endTime}
                </p>
              </div>
            )}
            <p>
              <span>Created On: &nbsp;</span>
              {moment(props.data.createdAt,).format("MMM Do YYYY, h:mm a",)}
            </p>
          </div>

          {/* action buttons */}
          <div className="modalActionButtons">
            <button
              className={`${
                props.complete ? "completedStatus" : "ongoingStatus"
              } btn btn-white btn-animate`}
              onClick={() => props.editTodoItem({
                id: props.data._id,
                complete: props.complete,
              },)}
            >
              <img src={props.complete ? Reload : CheckMark} alt="Add Todo" />
              {" "}
              {props.complete
                ? "Revert to ongoing tasks"
                : "Mark as complete"}
            </button>
            <button
              className="statusDeleteButton btn btn-white btn-animate"
              onClick={() => props.deleteTodoItem({
                id: props.data._id,
                complete: props.complete,
              },)}
            >
              <img src={Close} alt="Add Todo" />
              {" "}
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
);

export default TodoModal;
