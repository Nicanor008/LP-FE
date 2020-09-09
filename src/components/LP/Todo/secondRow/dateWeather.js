import React, { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import Cards from "../card"
import Degrees from "../../../../images/icons/degree.svg"
import { Loader } from "../../../common/loader"
import { useStaticQuery, graphql } from "gatsby"
import { server } from "../../../../utils/baseUrl"

function DateWeather(props) {
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

  const [time, setTime] = useState(null)

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("h:mm:ss a"))
    }, 1000)
  }, [time])

  useEffect(() => {
    setState({ ...data, loading: true })

    axios.get("https://json.geoiplookup.io/").then(async ip => {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${dataKey.site.siteMetadata.weatherApiKey}&q=${ip.data.ip}`
      )
      const currentUser = await server.get(`${props.apiBaseUrl}/users/active`)
      return setState({
        ...data,
        currentWeatherData: response.data.current,
        loading: false,
        ipAddress: ip.data.ip,
        username: currentUser.data.data.name,
        userLocation: {
          ipAddress: ip.data.ip,
          latitude: ip.data.latitude,
          longitude: ip.data.longitude,
          city: ip.data.city,
          country_name: ip.data.country_name,
          country_code: ip.data.country_code,
          continent_name: ip.data.continent_name,
          continent_code: ip.data.continent_code,
        },
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //   set temp unit(F/C)
  const tempUnit = unit => {
    setState({ ...data, activeTempUnit: unit })
  }

  return (
    <div>
      {data.loading ? (
        <Loader contextT="Loading ..." />
      ) : (
        <Cards
          title={
            "Hello, " +
            data.username.charAt(0).toUpperCase().concat(data.username.slice(1))
          }
          id="title"
        >
          <div className="thirdRowCardBody">
            <div>
              {/* date & time */}
              <h2>{time}</h2>
              <p>{moment().format("dddd, MMMM Do YYYY")}</p>
            </div>

            {/* weather */}
            <div className="weatherData">
              {/* {data.loading ? (
              <Loader />
            ) : ( */}
              {data.currentWeatherData.length !== 0 && (
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
                        <button
                          className="buttonWeatherChange"
                          onClick={() => tempUnit("F")}
                        >
                          <p>F</p>
                        </button>
                      )}
                      /
                      {data.activeTempUnit === "C" ? (
                        <u>
                          <b>C</b>
                        </u>
                      ) : (
                        <button
                          className="buttonWeatherChange"
                          onClick={() => tempUnit("C")}
                        >
                          <p>C</p>
                        </button>
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
              )}
              {/* )} */}
            </div>
          </div>
        </Cards>
      )}
    </div>
  )
}

export default DateWeather
