import React from "react"
import { Button, Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { MenuItemButton } from "../tabs"

const ButtonCard = ({ onclickSwapButton, viewByTodo }) => {
  return (
    <Flex alignItems="center" className="buttonCardWrapper">
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
          View by
        </MenuButton>
        <MenuList maxW="100">
          <MenuItemButton option="name" onClick={onclickSwapButton} activeOption={viewByTodo === "name"}>Name</MenuItemButton>
          <MenuItemButton option="tags" onClick={onclickSwapButton} activeOption={viewByTodo === "tags"}>Tags</MenuItemButton>
          <MenuItemButton option="priority" onClick={onclickSwapButton} activeOption={viewByTodo === "priority"}>Priority</MenuItemButton>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default ButtonCard
