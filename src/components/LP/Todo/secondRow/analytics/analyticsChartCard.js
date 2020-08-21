import React from "react"
import { Chart } from "react-google-charts"
import { Loader } from "../../../../common/loader"

function AnalyticsChartCard(props) {
  return (
    <div>
      <br />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<Loader />}
        data={[
          ["Task", "Total Number of Tasks"],
          ["Completed Tasks", props.data.totalCompletedTodo],
          ["Ongoing Tasks", props.data.totalUncompletedTodo]
        ]}
        options={{
          title: "Todo Statistics",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  )
}

export default AnalyticsChartCard
