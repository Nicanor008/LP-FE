import { Box, Button, Divider, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import React, { useState } from "react"
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
  activeCreateTodoOption,
  handleSelectActiveCreateTodoOption
}) => {
  return (
    <Box
      className="createTodo"
      style={{ maxHeight: showBody ? "600px" : "51px" }}
      name={name}
    >
      {/* tab header */}
      <Box className="tabHeader" mb={1}>
        <Box className="innerTabHeader" onClick={onClickArrow} role="button">
          <img src={todoTitleIcon} alt="Todo" className="tabTitleItem" />
          <h3 className="tabTitle tabTitleItem">{title}</h3>
        </Box>
        <Box className="innerTabHeaderRight">
          {!todoItemsTab && showBody && (
            <Menu>
              <MenuButton
                as={Button}
                mx={2}
                py={0}
                h={6}
                size="xs"
                fontSize="xs"
                bg="#ccceff"
                fontWeight={400}
                _hover={{ bg: "#ccceff" }}
                _active={{ bg: "#ccceff" }}
              >
                {activeCreateTodoOption}
              </MenuButton>
              <MenuList maxW="100">
                <MenuItemButton option="Basic" onClick={handleSelectActiveCreateTodoOption}>Basic</MenuItemButton>
                <MenuItemButton option="Medium" onClick={handleSelectActiveCreateTodoOption}>Medium</MenuItemButton>
                <MenuItemButton option="Advanced" onClick={handleSelectActiveCreateTodoOption}>Advanced</MenuItemButton>
              </MenuList>
            </Menu>
          )}
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
            maxHeight: "500px",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default Tabs


const MenuItemButton = ({ option, children, onClick }) => (
  <MenuItem onClick={() => onClick(option)} _hover={{ bg: "#ccceff" }} fontSize="xs">{children}</MenuItem>
)
