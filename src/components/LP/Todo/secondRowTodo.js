import React from "react"
import DateWeather from "./secondRow/dateWeather"

function SecondRowTodo(props) {
  return (
    <div>
      <DateWeather apiBaseUrl={props.apiBaseUrl}/>
    </div>
  )
}

export default SecondRowTodo
