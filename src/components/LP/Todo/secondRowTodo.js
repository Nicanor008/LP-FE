import React from "react";
import DateWeather from "./secondRow/dateWeather";
import Quote from "./secondRow/quote";
import AnalyticsCard from "./secondRow/analytics/analyticsCard";

function SecondRowTodo(props,) {
  return (
    <div>
      <DateWeather apiBaseUrl={props.apiBaseUrl} />
      <Quote />
      <AnalyticsCard
        apiBaseUrl={props.apiBaseUrl}
        analytics={props.analytics}
      />
    </div>
  );
}

export default SecondRowTodo;
