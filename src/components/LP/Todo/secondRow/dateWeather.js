import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Cards from "../card";
import Degrees from "../../../../images/icons/degree.svg";
import { useStaticQuery, graphql } from "gatsby";
import { server } from "../../../../utils/baseUrl";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import { Loader } from "../../../common";

function DateWeather() {
  const apiBaseUrl = useBaseUrl()

  const [data, setState] = useState({
    loading: false,
    currentWeatherData: [],
    activeTempUnit: "C",
    ipAddress: "",
    username: "",
    userLocation: {},
  });

  const dataKey = useStaticQuery(graphql`
    query SiteWeatherApiKeyQuery {
      site {
        siteMetadata {
          weatherApiKey
          ipInfoAPIToken
        }
      }
    }
  `);

  const [time, setTime] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  // Update the current time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format("h:mm:ss a"));
    }, 1000);

    return () => clearInterval(timeInterval); // Cleanup interval on unmount
  }, []);

  // Fetch the current user
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const currentUserResponse = await server.get(`${apiBaseUrl}/users/active`);
        if (currentUserResponse?.data?.data) {
          setCurrentUser(currentUserResponse.data.data);
        }
      } catch (error) {
        handleError(error);
      }
    }

    fetchCurrentUser();
  }, [apiBaseUrl]);

  // Fetch the weather data
  const fetchWeatherData = async () => {
    setState({ ...data, loading: true });

    try {
      const ipResponse = await axios.get(`https://ipinfo.io?token=${dataKey.site.siteMetadata.ipInfoAPIToken}`);
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${dataKey.site.siteMetadata.weatherApiKey}&q=${ipResponse.data.ip}`
      );

      if (weatherResponse?.data && ipResponse?.data) {
        setState({
          ...data,
          currentWeatherData: weatherResponse.data.current,
          loading: false,
          ipAddress: ipResponse.data?.ip,
          username: currentUser?.name || "",
          userLocation: {
            ipAddress: ipResponse.data.ip,
            latitude: ipResponse.data.latitude,
            longitude: ipResponse.data.longitude,
            city: ipResponse.data.city,
            country_name: ipResponse.data.country_name,
            country_code: ipResponse.data.country_code,
            continent_name: ipResponse.data.continent_name,
            continent_code: ipResponse.data.continent_code,
          },
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Call the weather fetch every 30 minutes
  useEffect(() => {
    // Fetch weather data immediately on component mount
    fetchWeatherData();

    // Set an interval to fetch weather every 30 minutes (30 * 60 * 1000 ms)
    const weatherInterval = setInterval(() => {
      fetchWeatherData();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(weatherInterval); // Cleanup interval on unmount
  }, [currentUser, dataKey]);

  const tempUnit = (unit) => {
    setState({ ...data, activeTempUnit: unit });
  };

  const handleError = (error) => {
    if (error.response) {
      console.error("Error Response:", error.response?.status, error.response?.data);
    } else if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
  };

  return (
    <Box>
      {data.loading ? (
        <Loader contextT="Loading ..." />
      ) : (
        <Cards
          title={
            data.username
              ? `Hello, ${data.username.charAt(0).toUpperCase() + data.username.slice(1)}`
              : ""
          }
          id="title"
        >
          <Flex className="thirdRowCardBody" flexDir={["column", "row"]}>
            <Box>
              <h2>{time}</h2>
              <p>{moment().format("dddd, MMMM Do YYYY")}</p>
            </Box>

            <Box className="weatherData">
              {data.currentWeatherData.length !== 0 && (
                <>
                  <h2>
                    {data.activeTempUnit === "C"
                      ? data.currentWeatherData.temp_c
                      : data.currentWeatherData.temp_f}
                    <span>
                      <img src={Degrees} alt="degrees" />
                    </span>
                    <Box className="tempUnit">
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
                    </Box>
                  </h2>
                  <img
                    src={data.currentWeatherData.condition.icon}
                    height="60"
                    width="60"
                    alt="current weather"
                  />
                </>
              )}
            </Box>
          </Flex>
        </Cards>
      )}
    </Box>
  );
}

export default DateWeather;
