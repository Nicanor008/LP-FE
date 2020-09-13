import React from "react";
import { Chart, } from "react-google-charts";
import { Loader, } from "../../../../common/loader";

function AnalyticsChartCard(props,) {
  return (
    <div>
      <Chart
        width="350px"
        height="300px"
        chartType="PieChart"
        loader={<Loader />}
        data={[
          ["Task", "Total Number of Tasks", ],
          ["Completed", props.data.totalCompletedTodo, ],
          ["Ongoing", props.data.totalUncompletedTodo, ],
        ]}
        options={{
          title: "Daily Statistics",
        }}
        rootProps={{ "data-testid": "1", }}
      />
    </div>
  );
}

export default AnalyticsChartCard;
