import React from "react"
import ArrowUp from "../../../images/icons/Arrow-up.svg"

const Tabs = ({ todoTitleIcon, title, children }) => (
  <div className="createTodo">
    {/* tab header */}
    <div className="tabHeader">
      <div className="innerTabHeader">
        <img src={todoTitleIcon} alt="Todo" className="tabTitleItem" />
        <h3 className="tabTitle tabTitleItem">{title}</h3>
      </div>
      <img src={ArrowUp} alt="Create Todo" />
    </div>
    <hr className="tabHeaderHR" />

    {/* tab body */}
    <div className="tabBody">
      {children}
    </div>
  </div>
)

export default Tabs
