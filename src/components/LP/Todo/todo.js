import React, { useState } from "react"
import moment from "moment"
import CheckMark from "../../../images/icons/checkmark.svg"
import Reload from "../../../images/icons/reload.svg"
import Close from "../../../images/icons/close.svg"
import "../../common/modal/modal.scss"
import Modal from "../../common/modal"
import { server } from "../../../utils/baseUrl"
import InProgress from "../../../images/inProgress.svg"
import Completed from "../../../images/Completed.svg"

const TodoItem = props => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // open/close modal
  const CloseOrOpenModal = () => {
    setShowModal(!showModal)
  }

  // view single item
  const onClickViewOneItem = id => {
    setLoading(true)
    setShowModal(!showModal)
    server.get(`/todo/${id}`).then(item => {
      setLoading(false)
      setData(item.data.data)
    })
  }

  return (
    <>
      <div className="todo">
        {!props.complete ? (
          <img
            src={CheckMark}
            alt="Check todo"
            onClick={() =>
              props.editTodoItem({ id: props.id, complete: props.complete })
            }
          />
        ) : (
          <img
            src={Reload}
            alt="Revert todo"
            onClick={() =>
              props.editTodoItem({ id: props.id, complete: props.complete })
            }
          />
        )}
        <img
          src={Close}
          alt="Close"
          onClick={() =>
            props.deleteTodoItem({ id: props.id, complete: props.complete })
          }
        />
        <p
          className="todoItemName"
          onClick={() => onClickViewOneItem(props.id)}
        >
          {props.name}
        </p>
      </div>

      {/* modal */}
      {data !== undefined && (
        <Modal
          loading={loading}
          showModal={showModal}
          onClickClose={CloseOrOpenModal}
          statusImage={data.completed ? Completed : InProgress}
        >
          <div>
            <div className="modalChildren">
              <p className="todoName">{data.name}</p>

              {/* time */}
              <div className="todoItemTimeWrapper">
                {data.duration !== null ? (
                  <div className="todoTime">
                    <p>
                      <span>Duration:</span> &nbsp;{data.duration}
                    </p>
                    <p>
                      <span>Start Time:</span> &nbsp;{data.startTime}
                    </p>
                    <p>
                      <span>End Time:</span> &nbsp;{data.endTime}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <p>
                  <span>Created On: &nbsp;</span>
                  {moment(data.createdAt).format("MMM Do YYYY, h:mm a")}
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
                      id: props.id,
                      complete: props.complete,
                    })
                  }
                >
                  <img
                    src={props.complete ? Reload : CheckMark}
                    alt="Add Todo"
                  />{" "}
                  {props.complete ? "Revert to ongoing tasks" : "Mark as complete"}
                </button>
                <button
                  className={`statusDeleteButton btn btn-white btn-animate`}
                  onClick={() =>
                    props.deleteTodoItem({
                      id: props.id,
                      complete: props.complete,
                    })
                  }
                >
                  <img src={Close} alt="Add Todo" /> Delete
                </button>
              </div>
            </div>
            {/* )} */}
          </div>
        </Modal>
      )}
    </>
  )
}

export default TodoItem
