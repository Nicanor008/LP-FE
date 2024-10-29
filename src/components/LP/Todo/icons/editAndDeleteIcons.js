import React from "react"
import { Flex, IconButton, Image } from "@chakra-ui/react"
import CheckMark from "../../../../images/icons/checkmark.svg"
import Reload from "../../../../images/icons/reload.svg"
import Close from "../../../../images/icons/close.svg"

const CommonIcons = props => {
  return (
    <Flex w="50px" minW="50px">
      <IconButton
        className="buttonUniformity"
        aria-label="edit"
        onClick={() =>
          props.editTodoItem({
            id: props.id,
            complete: props.complete,
          })
        }
        bg="red"
        pb={-4}
        mb={-3}
        size="sm"
        minW="16px"
        minH="16px"
      >
        <Image src={!props.complete ? CheckMark : Reload} alt="Check todo" w="full" minW="fit-content" />
      </IconButton>
      <IconButton
        className="buttonUniformity"
        aria-label="archive"
        onClick={() =>
          props.deleteTodoItem({
            id: props.id,
            complete: props.complete,
          })
        }
        p={0}
        m={0}
        pb={-4}
        mb={-3}
        size="sm"
        minW="16px"
        minH="16px"
      >
        <Image src={Close} alt="Close" w="full" minW="fit-content" />
      </IconButton>
    </Flex>
  )
}

export default CommonIcons
