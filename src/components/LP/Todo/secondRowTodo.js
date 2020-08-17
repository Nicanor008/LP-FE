import React from "react"
import DateWeather from "./secondRow/dateWeather"
import Quote from "./secondRow/quote"

function SecondRowTodo(props) {
  return (
    <div>
      <DateWeather apiBaseUrl={props.apiBaseUrl}/>
      <Quote />
    </div>
  )
}

export default SecondRowTodo
