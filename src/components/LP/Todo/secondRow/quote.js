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
  }, [])

  const randomizeQuotes = () => {
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
  }

  return (
    <div>
      <br />
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
