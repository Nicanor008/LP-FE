import React from "react"
import CloseCard from "../../../images/icons/closeCard.svg"
import CheckCard from "../../../images/icons/check.svg"
import { useState } from "react"

const Cards = ({ title, children }) => {
  const [close, setClose] = useState(true)

  const onClickCloseIcon = () => {
    return setClose(!close)
  }

  return (
    <div className="secondRowCardWrapper">
      <div className="secondRowCardHeader">
        <p>{title}</p>
        <img src={close ? CloseCard : CheckCard} alt="close" onClick={onClickCloseIcon} />
      </div>
      <div style={{ display: close ? "block" : "none" }}>{children}</div>
    </div>
  )
}
export default Cards
