import React from "react"
import { Loader } from "../loader"
import Close from "../../../images/icons/closeCard.svg"

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
                <img src={Close} alt="Close" />
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
