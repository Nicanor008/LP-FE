import React, { useEffect, useState } from "react"
import TodoItem from "./todo"
import axios from 'axios'
import { Loader } from "../../common/loader"
import Tabs from "./tabs"
import Walk from "../../../images/icons/walk.svg"

const OngoingTodo = ({
  newData,
  deleteTodoItem,
  editTodoItem,
  showBody,
  onClickArrow,
  loader,
  apiBaseUrl,
  headers
}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${apiBaseUrl}/todo/ongoing`, headers)
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
