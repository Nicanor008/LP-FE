import React, { useEffect, useState } from "react"
import moment from "moment"
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
    randomizeQuotes()
  }, [])

  const randomizeQuotes = () => {
    setState({ ...data, loading: true })
    axios.get("https://type.fit/api/quotes").then(res => {
      const quotes = res.data
      const item = quotes[Math.floor(Math.random() * quotes.length)]
      const minimizedActiveQuote = item.text.substr(0, 50).concat(" ...")
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
      {/* Random quotes */}
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
              <>
                <p>{data.dailyQuote.text}</p>
                <p>{data.dailyQuote.author}</p>
              </>
            )}
          </div>
        </div>
      </Cards>
    </div>
  )
}

export default Quote
