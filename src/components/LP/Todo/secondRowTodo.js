import React from "react"
import DateWeather from "./secondRow/dateWeather"
// import Quote from "./secondRow/quote"
import AnalyticsCard from "./secondRow/analytics/analyticsCard"

function SecondRowTodo(props) {
  return (
    <div className="secondRow">
      <DateWeather apiBaseUrl={props.apiBaseUrl} />
      {/* <Quote /> */}
      {/* <AnalyticsCard
        ongoingData={props.ongoingData}
        completedData={props.completedData}
        headers={props.headers}
        apiBaseUrl={props.apiBaseUrl}
      /> */}
    </div>
  )
}

export default SecondRowTodo
