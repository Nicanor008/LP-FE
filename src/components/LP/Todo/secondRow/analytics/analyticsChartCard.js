import React from "react"
import { Chart } from "react-google-charts"
import { Box } from "@chakra-ui/react"
import { Loader } from "../../../../common"

function AnalyticsChartCard({ completedTodo, ongoingTodo }) {
  return (
    <Box zIndex={-1000}>
      {completedTodo ? (
        <Chart
          width={"350px"}
          height={"300px"}
          chartType="PieChart"
          loader={<Loader />}
          data={[
            ["Task", "Total Number of Tasks"],
            ["Done", completedTodo],
            ["Ongoing", ongoingTodo]
          ]}
          // options={{
          //   title: "Daily Statistics",
          // }}
          zIndex={-1000}
          rootProps={{ "lp-analytics": "1" }}
        />
      ): null}
    </Box>
  )
}

export default AnalyticsChartCard
