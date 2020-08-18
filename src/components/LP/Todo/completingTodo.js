import React, { useEffect, useState } from "react"
import moment from "moment"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { useStaticQuery, graphql } from "gatsby"
import Tabs from "./tabs"
import Love from "../../../images/icons/love.svg"

// get base url hook
function useBaseUrl() {
  const data = useStaticQuery(graphql`
    query SiteTitleedQuery {
      site {
        siteMetadata {
          apiURL
        }
      }
    }
  `)

  const apiURL = data.site.siteMetadata.apiURL
  return apiURL
}
const CompletedTodo = ({
  newData,
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
}) => {
  const [data, setData] = useState([])
  const apiBaseUrl = useBaseUrl()
  const [loading, setLoading] = useState(false)

  const dat = []

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    setData([])
    server
      .get(`${apiBaseUrl}/todo/complete`)
      .then(response => {
        // get duration last updated
        response.data.data.forEach(s => {
          const durationLastUpdated = moment(
            s.updatedAt,
            "YYYYMMDDhhmm"
          ).fromNow()
          if (durationLastUpdated.indexOf("hour") > 1) {
            setLoading(false)
            setData(data => [...data, s])
          }
        })
      })
      .catch(() => {
        setData([])
        setLoading(false)
      })
  }, [newData, apiBaseUrl])

  return (
    <div>
      {loading ? (
        <span></span>
      ) : (
        <Tabs
          todoTitleIcon={Love}
          title={`${
            data.length > 1
              ? `${data.length} Tasks Completed`
              : `${data.length} Task Completed`
          }`}
          showBody={data.length > 0 && showBody}
          onClickArrow={onClickArrow}
        >
          <div className="onGoingTodoWrapper">
            {data.length >= 1 &&
              data.map(todo => (
                <TodoItem
                  name={todo.name}
                  key={todo._id}
                  complete
                  id={todo._id}
                  deleteTodoItem={deleteTodoItem}
                  editTodoItem={editTodoItem}
                />
              ))}
          </div>
        </Tabs>
      )}
    </div>
  )
}

export default CompletedTodo
