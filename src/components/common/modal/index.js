import React from "react"
import { Loader } from "../loader"

const Modal = ({
  children,
  showModal,
  onClickClose,
  loading,
  statusImage,
  keyword,
}) => {
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
              <div className="modalHeaderFirstColumn">
                <img src={statusImage} alt="status" />
                <p style={{ color: "black" }}>{keyword}</p>
              </div>
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
