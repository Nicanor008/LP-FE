import React, { useEffect, useState } from "react"
import moment from "moment"
import axios from 'axios'
import TodoItem from "./todo"
import Tabs from "./tabs"
import Love from "../../../images/icons/love.svg"


const CompletedTodo = ({
  newData,
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  apiBaseUrl,
  headers
}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const dat = []

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    setData([])
    axios
      .get(`${apiBaseUrl}/todo/complete`, headers)
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
        data.length > 0 &&
        <Tabs
          todoTitleIcon={Love}
          title={`${
            data.length > 1
              ? `${data.length} Tasks Completed in the last 23 hours`
              : `${data.length} Task Completed in the last 23 hours`
          }`}
          showBody={data.length > 0 && showBody}
          onClickArrow={onClickArrow}
        >
          <div className="onGoingTodoWrapper">
            {data.map(todo => (
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
