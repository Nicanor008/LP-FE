import React from "react"
import { Button as Btn, Image } from "@chakra-ui/react"
import "./button.scss"

const AddTodoButton = props => (
  <Btn
    className={`${props.classButtonName} btn btn-white btn-animate`}
    onClick={props.onclick}
    isLoading={props?.loading ?? false}
    _hover={{
      bg: "#796FED",
      color: 'white'
    }}
    bg="#796FED"
    color="white"
  >
    <Image src={props.icon} alt="Add Todo" /> {props.name}
  </Btn>
)

export default AddTodoButton
