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

  return (
    <div className={!icon ? `secondRowCardWrapper` : `quoteCardWrapper`}>
      <div className="secondRowCardHeader">
        <p>
          {title} {!close && titleQuote}
        </p>
        <div>
          {icon && (
            <img
              src={icon}
              alt="reload"
              onClick={randomizeQuote}
              className="reloadQuoteIcon"
            />
          )}
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
