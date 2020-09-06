import React, { useEffect, useState } from "react"
import moment from "moment"

function TimeCard() {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("h:mm:ss a"))
    }, 1000)
  }, [time])


  return <h2>{time}</h2>
}

export default TimeCard
