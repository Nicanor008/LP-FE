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
          <img src={CheckMark} alt="Check todo" />
        ) : (
          <img src={Reload} alt="Revert todo" />
        )}
        <img src={Close} alt="Close" onClick={() => props.deleteTodoItem({id:props.id, complete:props.complete})} />
        <a
          className="todoItemName"
          href="#popup"
          onClick={() => onClickViewOneItem(props.id)}
        >
          {props.name}
        </a>
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
                ) : ""}
                <p>
                  <span>Created On: &nbsp;</span>
                  {moment(data.createdAt).format("MMM Do YYYY, h:mm a")}
                </p>
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
