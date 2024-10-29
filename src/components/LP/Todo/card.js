import { Box } from "@chakra-ui/react"
import React, { useState } from "react"
import CloseCard from "../../../images/icons/closeCard.svg"
import CheckCard from "../../../images/icons/check.svg"

const Cards = ({ title, titleQuote, icon, randomizeQuote, children }) => {
  const [close, setClose] = useState(true)

  const onClickCloseIcon = () => {
    return setClose(!close)
  }

  return (
    <Box className={!icon ? `secondRowCardWrapper` : `quoteCardWrapper`} w={['90vw', '100%']}>
      <div className="secondRowCardHeader">
        <p>
          {title} {!close && titleQuote}
        </p>
        <div>
          {icon && (
            <button className="buttonWeatherChange" onClick={randomizeQuote}>
              <img src={icon} alt="reload" className="reloadQuoteIcon" />
            </button>
          )}
          <button className="buttonWeatherChange" onClick={onClickCloseIcon}>
            <img src={close ? CloseCard : CheckCard} alt="close" />
          </button>
        </div>
      </div>
      {close && (
        <Box>{children}</Box>
      )}
    </Box>
  )
}
export default Cards
