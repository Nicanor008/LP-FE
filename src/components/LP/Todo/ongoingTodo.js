import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { Loader } from "../../common/loader"
import { useStaticQuery, graphql } from "gatsby"
import Tabs from "./tabs"
import Walk from "../../../images/icons/walk.svg"

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

const OngoingTodo = ({
  newData,
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  loader,
}) => {
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
        setData([])
        setLoading(false)
      })
  }, [newData, apiBaseUrl])

  return (
    <div>
      {loading || loader ? (
        <Loader />
      ) : (
        data.length > 0 && (
          <>
            <Tabs
              todoTitleIcon={Walk}
              title={`${
                data.length > 1
                  ? `${data.length} Tasks in Progress`
                  : `${data.length} Task in Progress`
              }`}
              showBody={data.length > 0 && showBody}
              onClickArrow={onClickArrow}
            >
              <div className="onGoingTodoWrapper">
                {/* {loading ? (
          <Loader />
        ) : ( */}
                {data.map(todo => (
                  <TodoItem
                    name={todo.name}
                    key={todo._id}
                    complete={false}
                    id={todo._id}
                    deleteTodoItem={deleteTodoItem}
                    editTodoItem={editTodoItem}
                  />
                ))}
                {/* )} */}
              </div>
            </Tabs>

            <br />
            <br />
          </>
        )
      )}
    </div>
  )
}

export default OngoingTodo
