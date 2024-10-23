/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// gatsby-browser.jsx
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

// Import your extended theme from a location in `./src`
// import { customTheme } from './src/theme'

export const wrapRootElement = ({ element }) => (
  // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
  <ChakraProvider>{element}</ChakraProvider>
)
