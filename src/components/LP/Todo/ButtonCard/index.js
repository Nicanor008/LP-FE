import React from "react"
import "./buttonCard.scss"
import { Flex } from "@chakra-ui/react"

const ButtonCard = ({ onclickSwapButton, viewByTodo }) => {
  return (
    <Flex alignItems="center" className="buttonCardWrapper">
      <button className="buttonCard" onClick={onclickSwapButton}>
        {!viewByTodo ? `View By Todo name` : `View By Keywords`}
      </button>
    </Flex>
  )
}

export default ButtonCard
