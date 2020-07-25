import React from "react"
import ArrowUp from "../../../images/icons/Arrow-up.svg"
import ArrowDown from "../../../images/icons/Arrow-down.svg"

const Tabs = ({ todoTitleIcon, title, onClickArrow, showBody, name, children }) => (
  <div className="createTodo"
      style={{ maxHeight: showBody ? "500px" : "51px" }}
      name={name}
  >
    {/* tab header */}
    <div className="tabHeader">
      <div className="innerTabHeader">
        <img src={todoTitleIcon} alt="Todo" className="tabTitleItem" />
        <h3 className="tabTitle tabTitleItem">{title}</h3>
      </div>
      <img src={showBody ? ArrowUp : ArrowDown} alt="Create Todo" onClick={onClickArrow} className="arrowIcon"/> 
    </div>
    {showBody && <hr className="tabHeaderHR" />}

    {/* tab body */}
    <div
      className="tabBody"
      style={{ display: showBody ? "block" : "none", cursor: "pointer", maxHeight: showBody ? "400px" : "0"}}
    >
      {children}
    </div>
  </div>
)

export default Tabs
