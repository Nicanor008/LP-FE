import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { useStaticQuery, graphql } from "gatsby"
import { Loader } from "../../common/loader"
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
  loader,
}) => {
  const [data, setData] = useState([])
  const apiBaseUrl = useBaseUrl()
  const [loading, setLoading] = useState(false)

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    server
      .get(`${apiBaseUrl}/todo/complete`)
      .then(response => {
        setLoading(false)
        setData(response.data.data)
      })
      .catch(() => {
        setData([])
        setLoading(false)
      })
  }, [newData, apiBaseUrl])

  return (
    (loading || loader) ? (
      // <Loader />
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
        {/* {loading || loader ? (
          <Loader />
        ) : ( */}
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
        {/* )} */}
      </div>
    </Tabs>
    )
  )
}

export default CompletedTodo
