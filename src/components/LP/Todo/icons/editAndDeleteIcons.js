import React from "react"
import { Flex, IconButton, Image } from "@chakra-ui/react"
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import CheckMark from "../../../../images/icons/checkmark.svg"
import Reload from "../../../../images/icons/reload.svg"
import Close from "../../../../images/icons/close.svg"

const CommonIcons = props => {
  return (
    <Flex w="56px" minW="66px" alignItems="center" mx={1} justifyContent="space-between">
      <IconButton
        className="buttonUniformity"
        aria-label="edit"
        onClick={() =>
          props.editTodoItem({
            id: props.id,
            complete: props.complete,
          })
        }
        size="sm"
        minW="16px"
        minH="16px"
        icon={<Image src={!props.complete ? CheckMark : Reload} alt="Check todo" w="full" minW="fit-content" m={0} p={0} pr={1} />}
      />
      <IconButton
        className="buttonUniformity"
        aria-label="archive"
        onClick={() =>
          props.deleteTodoItem({
            id: props.id,
            complete: props.complete,
          })
        }
        size="sm"
        minW="16px"
        minH="16px"
        // mx={2}
        icon={<Image src={Close} alt="Close" w="full" minW="fit-content" my={0} mx={0} p={0} />}
      />
      <IconButton
        className="buttonUniformity"
        aria-label="archive"
        onClick={() =>
          props.viewTodoItem(props.id)
        }
        size="sm"
        minW="16px"
        minH="16px"
        alignItems="center"
        icon={<IoEyeOutline size="76%"  bg="lime" color="blue" />}
      />
    </Flex>
  )
}

export default CommonIcons
