import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { useStaticQuery, graphql } from "gatsby"
import { Loader } from "../../common/loader"

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
const CompletedTodo = ({ newData, deleteTodoItem, editTodoItem }) => {
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
        setLoading(false)
      })
  }, [newData, apiBaseUrl])

  return (
    <div className="onGoingTodoWrapper">
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.map(todo => (
          <TodoItem
            name={todo.name}
            key={todo._id}
            complete
            id={todo._id}
            deleteTodoItem={deleteTodoItem}
            editTodoItem={editTodoItem}
          />
        ))
      )}
    </div>
  )
}

export default CompletedTodo
