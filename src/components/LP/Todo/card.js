import React, { useState, } from "react";
import CloseCard from "../../../images/icons/closeCard.svg";
import CheckCard from "../../../images/icons/check.svg";

const Cards = ({
  title, titleQuote, icon, randomizeQuote, children,
},) => {
  const [close, setClose, ] = useState(true,);

  const onClickCloseIcon = () => setClose(!close,);

  return (
    <div className={!icon ? "secondRowCardWrapper" : "quoteCardWrapper"}>
      <div className="secondRowCardHeader">
        <p>
          {title}
          {" "}
          {!close && titleQuote}
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
      <div style={{ display: close ? "block" : "none", }}>{children}</div>
    </div>
  );
};
export default Cards;
