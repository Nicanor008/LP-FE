import React, { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import Cards from "./card"
import Degrees from "../../../images/icons/degree.svg"
import { Loader } from "../../common/loader"
import { useStaticQuery, graphql } from "gatsby"

function SecondRowTodo() {
  // const currentTime = useRealTime()
  const [data, setState] = useState({
    loading: false,
    currentWeatherData: [],
    activeTempUnit: "C",
    ipAddress: "",
    userLocation: {},
  })

  const dataKey = useStaticQuery(graphql`
    query SiteWeatherApiKeyQuery {
      site {
        siteMetadata {
          weatherApiKey
        }
      }
    }
  `)

  useEffect(() => {
    setState({ ...data, loading: true })
    axios.get("https://json.geoiplookup.io/").then(async res => {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${dataKey.site.siteMetadata.weatherApiKey}&q=${res.data.ip}`
      )
      return setState({
        ...data,
        currentWeatherData: response.data.current,
        loading: false,
        ipAddress: res.data.ip,
        userLocation: {
          ipAddress: res.data.ip,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          city: res.data.city,
          country_name: res.data.country_name,
          country_code: res.data.country_code,
          continent_name: res.data.continent_name,
          continent_code: res.data.continent_code,
        },
      })
    })
  }, [])

  //   set temp unit(F/C)
  const tempUnit = unit => {
    setState({ ...data, activeTempUnit: unit })
  }

  function realtime() {
    let time = moment().format("h:mm:ss a")
    let y = typeof window !== undefined && document.getElementById("time")
    if (y && y !== null) {
      y.innerHTML = time

      setInterval(() => {
        time = moment().format("h:mm:ss a")
        y.innerHTML = time
      }, 1000)
    }
  }

  return (
    <div>
      {/* greetings, date, time and weather */}
      <Cards title="Good Evening Nickie">
        <div className="thirdRowCardBody">
          <div>
            {/* date & time */}
            <h2 id="time" onLoad={realtime()}></h2>
            <p>{moment().format("dddd, MMMM Do YYYY")}</p>
          </div>

          {/* weather */}
          <div className="weatherData">
            {data.loading ? (
              <Loader />
            ) : (
              data.currentWeatherData.length !== 0 && (
                <>
                  <h2>
                    {data.activeTempUnit === "C"
                      ? data.currentWeatherData.temp_c
                      : data.currentWeatherData.temp_f}
                    <span>
                      <img src={Degrees} alt="degrees" />
                    </span>
                    <div className="tempUnit">
                      {data.activeTempUnit === "F" ? (
                        <u>
                          <b>F</b>
                        </u>
                      ) : (
                        <span onClick={() => tempUnit("F")}>F</span>
                      )}
                      /
                      {data.activeTempUnit === "C" ? (
                        <u>
                          <b>C</b>
                        </u>
                      ) : (
                        <span onClick={() => tempUnit("C")}>C</span>
                      )}
                    </div>
                  </h2>
                  <img
                    src={data.currentWeatherData.condition.icon}
                    height="60"
                    width="60"
                    alt="current weather"
                  />
                </>
              )
            )}
          </div>
        </div>
      </Cards>
    </div>
  )
}

export default SecondRowTodo
