import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { Loader } from "../../common/loader"
import { useStaticQuery, graphql } from "gatsby"

// get base url hook
function useBaseUrl() {
  const data = useStaticQuery(graphql`
    query SiteTitlesQuery {
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

const OngoingTodo = ({ newData, deleteTodoItem, editTodoItem }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const apiBaseUrl = useBaseUrl()

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    server
      .get(`${apiBaseUrl}/todo/ongoing`)
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
            complete={false}
            id={todo._id}
            deleteTodoItem={deleteTodoItem}
            editTodoItem={editTodoItem}
          />
        ))
      )}
    </div>
  )
}

export default OngoingTodo
