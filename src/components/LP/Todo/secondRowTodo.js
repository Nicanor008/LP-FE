import { Box, Button, Flex } from "@chakra-ui/react"
import React from "react"
import DateWeather from "./secondRow/dateWeather"
// import Quote from "./secondRow/quote"
import AnalyticsCard from "./secondRow/analytics/analyticsCard"

function SecondRowTodo({ updateAnalytics }) {

  return (
    <Box className="secondTodoColumn">
      <Box className="secondRow" minW={["100%", "34%"]} position={["relative", "fixed"]}>
        <Flex gap={4} mb={4}>
          <Button bg="none" border="1px solid" borderColor="#9ea3f6" fontWeight={500}>Timer</Button>
          <Button bg="none" border="1px solid" borderColor="#9ea3f6" fontWeight={500}>Pomodoro</Button>
        </Flex>
        <DateWeather />
        {/* <Quote /> */}
        <AnalyticsCard updateAnalytics={updateAnalytics} />
      </Box>
    </Box>
  )
}

export default SecondRowTodo
