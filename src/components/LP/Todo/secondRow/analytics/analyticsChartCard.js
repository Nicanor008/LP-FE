import React from "react"
import { Chart } from "react-google-charts"
import { Box } from "@chakra-ui/react"
import { Loader } from "../../../../common/loader"

function AnalyticsChartCard(props) {
  return (
    <Box>
      {props.completedTodo.length ? (
        <Chart
          width={"350px"}
          height={"300px"}
          chartType="PieChart"
          loader={<Loader />}
          data={[
            ["Task", "Total Number of Tasks"],
            ["Done", props.completedTodo.length],
            ["Ongoing", props.ongoingTodo.length]
          ]}
          // options={{
          //   title: "Daily Statistics",
          // }}
          zIndex={0}
          rootProps={{ "lp-analytics": "1" }}
        />
      ): null}
    </Box>
  )
}

export default AnalyticsChartCard
