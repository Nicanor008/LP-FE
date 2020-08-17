import React from "react"
import moment from "moment"
import CloseCard from "../../../images/icons/closeCard.svg"
import CheckCard from "../../../images/icons/check.svg"
import { useState } from "react"

const Cards = ({ title, titleQuote, icon, randomizeQuote, children }) => {
  const [close, setClose] = useState(true)

  const onClickCloseIcon = () => {
    return setClose(!close)
  }

  //   count down time
  function realtimeOnHeader() {
    let time = moment().format("h:mm:ss a")
    let z =
      typeof window !== "undefined" && window.document.getElementById("cardHeaderTime")
    if (z && z !== null) {
      z.innerHTML = time

      setInterval(() => {
        time = moment().format("h:mm:ss a")
        z.innerHTML = time
      }, 1000)
    }
  }

  return (
    <div className={!icon ? `secondRowCardWrapper` : `quoteCardWrapper`}>
      <div className="secondRowCardHeader">
        <p>{title} {!close && titleQuote}</p>
        <h3
          onLoad={realtimeOnHeader()}
          id="cardHeaderTime"
          style={{ display: !close ? "block" : "none" }}
        ></h3>
        <div>
        {icon && <img
          src={icon}
          alt="reload"
          onClick={randomizeQuote}
          className="reloadQuoteIcon"
        />}
        <img
          src={close ? CloseCard : CheckCard}
          alt="close"
          onClick={onClickCloseIcon}
        />
        </div>
      </div>
      <div style={{ display: close ? "block" : "none" }}>{children}</div>
    </div>
  )
}
export default Cards
