import React from "react"
import moment from "moment"
import CloseCard from "../../../images/icons/closeCard.svg"
import CheckCard from "../../../images/icons/check.svg"
import { useState } from "react"

const Cards = ({ title, children }) => {
  const [close, setClose] = useState(true)

  const onClickCloseIcon = () => {
    return setClose(!close)
  }

  //   count down time
  function realtimeOnHeader() {
    let time = moment().format("h:mm:ss a")
    let z =
      typeof window !== undefined && document.getElementById("cardHeaderTime")
    if (z && z !== null) {
      z.innerHTML = time

      setInterval(() => {
        time = moment().format("h:mm:ss a")
        z.innerHTML = time
      }, 1000)
    }
  }

  return (
    <div className="secondRowCardWrapper">
      <div className="secondRowCardHeader">
        <p>{title}</p>
        <h3
          onLoad={realtimeOnHeader()}
          id="cardHeaderTime"
          style={{ display: !close ? "block" : "none" }}
        ></h3>
        <img
          src={close ? CloseCard : CheckCard}
          alt="close"
          onClick={onClickCloseIcon}
        />
      </div>
      <div style={{ display: close ? "block" : "none" }}>{children}</div>
    </div>
  )
}
export default Cards
