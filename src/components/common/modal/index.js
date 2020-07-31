import React from "react"
import { Loader } from "../loader"

const Modal = ({ children, showModal, onClickClose, loading, statusImage }) => {
  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-content">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* header */}
            <div className="modalHeader">
            <img src={statusImage} alt="status" />
              <span className="close" onClick={onClickClose}>
                &times;
              </span>
            </div>
            <hr className="modalHR" />
            {/* body */}
            {children}
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
