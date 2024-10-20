import React, { useEffect, useState } from "react"
import axios from "axios"
import Cards from "../card"
import { Loader } from "../../../common/loader"
import Reload from "../../../../images/icons/reload.svg"

function Quote() {
  const [data, setState] = useState({
    loading: false,
    dailyQuote: {},
    minimizedActiveQuote: "",
  })

  useEffect(() => {
    setState({ ...data, loading: true })
    try {
      axios.get("https://type.fit/api/quotes").then(res => {
        const quotes = res.data
        const item = quotes[Math.floor(Math.random() * quotes.length)]
        const minimizedActiveQuote =
          item.text.length > 60
            ? item.text.substr(0, 50).concat(" ...")
            : item.text.substr(0, 50)
        return setState({
          ...data,
          loading: false,
          minimizedActiveQuote: minimizedActiveQuote,
          dailyQuote: item,
        })
      })
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of 2xx range
        console.error('Error Response:', error.response.status, error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error Request:', error.request);
      } else {
        // Something else happened
        console.error('Error Message:', error.message);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const randomizeQuotes = () => {
    try {
      setState({ ...data, loading: true })
      axios.get("https://type.fit/api/quotes").then(res => {
        const quotes = res.data
        const item = quotes[Math.floor(Math.random() * quotes.length)]
        const minimizedActiveQuote =
          item.text.length > 60
            ? item.text.substr(0, 50).concat(" ...")
            : item.text.substr(0, 50)
        return setState({
          ...data,
          loading: false,
          minimizedActiveQuote: minimizedActiveQuote,
          dailyQuote: item,
        })
      })
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of 2xx range
        console.error('Error Response:', error.response.status, error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error Request:', error.request);
      } else {
        // Something else happened
        console.error('Error Message:', error.message);
      }
    }
  }

  return (
    <div>
      <br />
      <Cards
        titleQuote={!data.loading && data.minimizedActiveQuote}
        icon={Reload}
        randomizeQuote={randomizeQuotes}
      >
        <div className="thirdRowCardBody">
          <div className="quoteData">
            {data.loading ? (
              <Loader />
            ) : (
              <div>
                <p>{data.dailyQuote.text}</p>
                <p>{data.dailyQuote.author}</p>
              </div>
            )}
          </div>
        </div>
      </Cards>
    </div>
  )
}

export default Quote
