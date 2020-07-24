import React from "react"
import WriteSmall from "../../../images/icons/write-small.svg"
import ArrowUp from "../../../images/icons/Arrow-up.svg"

const Tabs = ({ children }) => (
  <div className="createTodo">
    {/* tab header */}
    <div className="tabHeader">
      <div className="innerTabHeader">
        <img src={WriteSmall} alt="Create Todo" className="tabTitleItem" />
        <h3 className="tabTitle tabTitleItem">Write Todo</h3>
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
