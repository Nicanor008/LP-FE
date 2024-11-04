import { Box } from "@chakra-ui/react"
import React from "react"
import Close from "../../../images/icons/closeCard.svg"
import { Loader } from ".."

const Modal = ({
  children,
  showModal,
  onClickClose,
  loading,
  statusImage,
  keyword,
}) => {
  return (
    showModal && (
      <Box
        id="myModal"
        className="modal"
        style={{ display: showModal ? "block" : "none" }}
        fontFamily="Arial"
      >
        <Box className="modal-content">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* header */}
              <Box className="modalHeader">
                <Box className="modalHeaderFirstColumn">
                  <img src={statusImage} alt="status" />
                  <p style={{ color: "black" }}>{keyword}</p>
                </Box>
                <button className="buttonUniformity close" onClick={onClickClose}>
                  <img src={Close} alt="Close" />
                </button>
              </Box>
              <hr className="modalHR" />
              {/* body */}
              {children}
            </>
          )}
        </Box>
      </Box>
    )
  )
}

export default Modal
