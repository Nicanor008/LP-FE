import { Button } from "@chakra-ui/react";
import React from 'react'

export const ChakraButton = ({children, ...props}) => (
    <Button size="sm" textTransform="lowercase" fontFamily="Arial" fontWeight={500} {...props}>{children}</Button>
)
