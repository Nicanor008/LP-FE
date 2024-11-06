import { Box, Button, Divider, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
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
  activeCreateTodoOption,
  handleSelectActiveCreateTodoOption,
  searchBar,
  filters
}) => {
  return (
    <Box
      className="createTodo"
      style={{ maxHeight: showBody ? "600px" : "51px" }}
      name={name}
      overflow="scroll"
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
                <MenuItemButton option="Basic" onClick={handleSelectActiveCreateTodoOption} activeOption={activeCreateTodoOption === "Basic"}>Basic</MenuItemButton>
                <MenuItemButton option="Medium" onClick={handleSelectActiveCreateTodoOption} activeOption={activeCreateTodoOption === "Medium"}>Medium</MenuItemButton>
                <MenuItemButton option="Advanced" onClick={handleSelectActiveCreateTodoOption} activeOption={activeCreateTodoOption === "Advanced"}>Advanced</MenuItemButton>
              </MenuList>
            </Menu>
          )}
          {todoItemsTab && showBody && (
            <>
              {/* <BsFilterLeft size={24} /> */}
              {filters}
              {searchBar}
              <ButtonCard
                onclickSwapButton={onclickSwapButton}
                viewByTodo={viewByTodo}
              />
            </>
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
            maxHeight: todoItemsTab ? "450px" : "555px",
            overflow: !todoItemsTab ? "visible" : "scroll"
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default Tabs


export const MenuItemButton = ({ option, activeOption, children, onClick }) => (
  <MenuItem
    onClick={() => !activeOption ? onClick(option) : null}
    _hover={{ bg: "#ccceff" }}
    bg={activeOption ? "#ccceff" : "transparent"}
    fontWeight={activeOption ? "bold" : "normal"}
    fontSize="xs"
    rounded="sm"
    cursor={activeOption ? "default" : "cursor"}
  >
    {children}
  </MenuItem>
)
