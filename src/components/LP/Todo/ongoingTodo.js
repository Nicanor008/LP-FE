import React, { useEffect, useState } from "react"
import { server } from "../../../utils/baseUrl"
import TodoItem from "./todo"
import { Loader } from "../../common/loader"

const OngoingTodo = ({newData}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    server.get("/todo/ongoing").then(response => {
      setLoading(false)
      setData(response.data.data)
    }).catch(() => {
      setLoading(false)
  })
  }, [newData])

  // componentDidUpdate
  // useEffect(() => {
    // Your code here
  // }, [yourDependency]);

  return (
    <div className="onGoingTodoWrapper">
      {loading ? (
        <Loader />
      ) : (
        data.length > 0 && data.map(todo => <TodoItem name={todo.name} key={todo._id}/>)
      )}
    </div>
  )
}

export default OngoingTodo
