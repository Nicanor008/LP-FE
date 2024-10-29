import { Box } from "@chakra-ui/react"
import React from "react"
import DateWeather from "./secondRow/dateWeather"
// import Quote from "./secondRow/quote"
import AnalyticsCard from "./secondRow/analytics/analyticsCard"

function SecondRowTodo() {
  return (
    <Box className="secondTodoColumn">
      <Box className="secondRow">
        <DateWeather />
        {/* <Quote /> */}
        <AnalyticsCard />
      </Box>
    </Box>
  )
}

export default SecondRowTodo
