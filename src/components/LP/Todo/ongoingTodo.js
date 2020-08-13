import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { Loader } from "../../common/loader"

const OngoingTodo = ({ newData, deleteTodoItem, editTodoItem }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    server
      .get("/todo/ongoing")
      .then(response => {
        setLoading(false)
        setData(response.data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [newData])

  console.log(">>>>>.........>>>>>......", data)
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
