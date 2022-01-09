import React from "react"
import { Chart } from "react-google-charts"
import { Loader } from "../../../../common/loader"

function AnalyticsChartCard(props) {
  return (
    <div>
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
          options={{
            title: "Daily Statistics",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      ): null}
    </div>
  )
}

export default AnalyticsChartCard
