import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import React from "react"
import "./inputs.scss"

const InputWithLabel = props => (
  <FormControl mb={0}>
    {props.labelName && <FormLabel htmlFor={props.labelName}>{props.labelName}</FormLabel>}
    <Input
      type={props?.type ?? "text"}
      placeholder={props?.placeholder}
      className="input"
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  </FormControl>
)

export default InputWithLabel
