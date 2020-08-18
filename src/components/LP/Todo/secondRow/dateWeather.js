import React, { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import Cards from "../card"
import Degrees from "../../../../images/icons/degree.svg"
import { Loader } from "../../../common/loader"
import { useStaticQuery, graphql } from "gatsby"
import { server } from "../../../../utils/baseUrl"

function DateWeather(props) {
  // const currentTime = useRealTime()
  const [greeting, setGreeting] = useState("")
  const [data, setState] = useState({
    loading: false,
    currentWeatherData: [],
    activeTempUnit: "C",
    ipAddress: "",
    username: "",
    userLocation: {},
  })

  //   get weather api secret key
  const dataKey = useStaticQuery(graphql`
    query SiteWeatherApiKeyQuery {
      site {
        siteMetadata {
          weatherApiKey
        }
      }
    }
  `)

  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  useEffect(() => {
    setState({ ...data, loading: true })
    const splitAfternoon = 12 // 24hr time to split the afternoon
    const splitEvening = 17 // 24hr time to split the evening

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      // Between 12 PM and 5PM
      setGreeting("Good afternoon")
    } else if (currentHour >= splitEvening) {
      // Between 5PM and Midnight
      setGreeting("Good evening")
    } else {
      // Between dawn and noon
      setGreeting("Good morning")
    }

    axios.get("https://json.geoiplookup.io/").then(async res => {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${dataKey.site.siteMetadata.weatherApiKey}&q=${res.data.ip}`
      )
      const currentUser = await server.get(`${props.apiBaseUrl}/users/active`)
      return setState({
        ...data,
        currentWeatherData: response.data.current,
        loading: false,
        ipAddress: res.data.ip,
        username: currentUser.data.data.name,
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
  }, [currentHour])

  //   set temp unit(F/C)
  const tempUnit = unit => {
    setState({ ...data, activeTempUnit: unit })
  }

  //   count down time
  function realtime() {
    let time = moment().format("h:mm:ss a")
    if (!data.loading && typeof window !== "undefined") {
      let y = typeof window !== "undefined" && window.document.getElementById("time")
      if (y && y !== null) {
        y.innerHTML = time

        setInterval(() => {
          time = moment().format("h:mm:ss a")
          y.innerHTML = time
        }, 1000)
      }
    }
  }

  return (
    <div>
      {/* greetings, date, time and weather */}
      <Cards
        title={greeting + " " + data.username}
        id="title"
      >
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

export default DateWeather
