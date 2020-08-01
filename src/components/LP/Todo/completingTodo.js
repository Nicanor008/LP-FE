import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { Loader } from "../../common/loader"

const CompletedTodo = ({ newData, deleteTodoItem }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    server.get("/todo/complete").then(response => {
      setLoading(false)
      setData(response.data.data)
    }).catch(() => {
        setLoading(false)
    })
  }, [newData])

  return (
    <div className="onGoingTodoWrapper">
      {loading ? (
        <Loader />
      ) : (
        data.length > 0 && data.map(todo => <TodoItem name={todo.name} key={todo._id} complete id={todo._id} deleteTodoItem={deleteTodoItem}/>)
      )}
    </div>
  )
}

export default CompletedTodo
