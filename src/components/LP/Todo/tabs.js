import { Box, Divider } from "@chakra-ui/react"
import React from "react"
import ArrowUp from "../../../images/icons/Arrow-up.svg"
import ArrowDown from "../../../images/icons/Arrow-down.svg"
import ButtonCard from "./ButtonCard"

const Tabs = ({
  todoTitleIcon,
  title,
  onClickArrow,
  showBody,
  name,
  children,
  todoItemsTab,
  viewByTodo,
  onclickSwapButton,
}) => (
  <Box
    className="createTodo"
    style={{ maxHeight: showBody ? "500px" : "51px" }}
    name={name}
  >
    {/* tab header */}
    <Box className="tabHeader" mb={1}>
      <Box className="innerTabHeader" onClick={onClickArrow} role="button">
        <img src={todoTitleIcon} alt="Todo" className="tabTitleItem" />
        <h3 className="tabTitle tabTitleItem">{title}</h3>
      </Box>
      <Box className="innerTabHeaderRight">
        {todoItemsTab && showBody && (
          <ButtonCard
            onclickSwapButton={onclickSwapButton}
            viewByTodo={viewByTodo}
          />
        )}
        <button
          className="buttonUniformity"
          onClick={onClickArrow}
          onKeyDown={onClickArrow}
        >
          <img
            src={showBody ? ArrowUp : ArrowDown}
            alt="Create Todo"
            className="arrowIcon"
          />
        </button>
      </Box>
    </Box>
    {showBody && <Divider bg="#c2c5ff" borderWidth={0.3} h="0.1px" />}

    {/* tab body */}
    {showBody && (
      <Box
        className="tabBody"
        style={{
          cursor: "pointer",
          maxHeight: "400px",
        }}
      >
        {children}
      </Box>
    )}
  </Box>
)

export default Tabs
