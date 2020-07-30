import React, { useState, useEffect } from "react"
import jwt from 'jsonwebtoken'
import SEO from "../components/seo"
import Layout from "../components/layout"
import Input from "../components/common/inputs/input"
import Tabs from "../components/LP/Todo/tabs"
import Button from "../components/common/buttons/button"
import "../components/LP/Todo/todo.scss"
import WriteSmall from "../images/icons/write-small.svg"
import Walk from "../images/icons/walk.svg"
import Love from "../images/icons/love.svg"
import OngoingTodo from "../components/LP/Todo/ongoingTodo"
import CompletedTodo from "../components/LP/Todo/completingTodo"
import { server } from "../utils/baseUrl"

const CreateTodo = () => {
  const [form, setState] = useState({
    category: "",
    tags: "",
    name: "",
    startTime: "",
    endTime: "",
    duration: "",
    showCreateTodo: true,
    showOngoingTodo: true,
    showCompletedTodo: true,
    showBody: true,
    user: ''
  })

  // load user token
  useEffect(() => {
    const token = localStorage.getItem('token')
    const activeToken = token && jwt.decode(token.substr(7))
    setState({
      ...form,
      user: activeToken.id
    })
  }, [])

  // on change event
  const onInputChange = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // submit todo
  const onClickAddTodoButton = e => {
    e.preventDefault()
    var x = document.getElementById("snackbar")
    server.post("/todo", form)
      .then(function (response) {
        x.className = "show"
      x.innerHTML = response.data.message
      x.style.backgroundColor = "#585df6"
      return setTimeout(function () {
        x.className = x.className.replace("show", "")
      }, 3000)
      })
      .catch(function (error) {
        x.className = "show"
        x.innerHTML = error.response.data.message
        x.style.backgroundColor = "#f3648c"
        return setTimeout(function () {
          x.className = x.className.replace("show", "")
        }, 3000)
      })
  }

  // close create todo body
  const onClickArrowOnCreateTodo = (e) => {
    return setState({
      ...form,
      showCreateTodo: !form.showCreateTodo,
    })
  }

  // close ongoing todo body
  const onClickArrowOngoingTodo = () => {
    return setState({
      ...form,
      showOngoingTodo: !form.showOngoingTodo,
    })
  }

  // close create todo body
  const onClickArrowOnCompletedTodo = () => {
    return setState({
      ...form,
      showCompletedTodo: !form.showCompletedTodo,
    })
  }

  return (
    <Layout>
      <SEO title="Create Todo" description="Create Todo" />
      <div className="createTodoWrapper">
        <br />
        <div className="FirstRowCreateTodo">
          {/* create todo */}
          <Tabs
            todoTitleIcon={WriteSmall}
            title="Write Todo"
            showBody={form.showCreateTodo}
            onClickArrow={onClickArrowOnCreateTodo}
          >
            <Input
              type="text"
              placeholder="Keyword"
              name="tags"
              value={form.keyword}
              onchange={onInputChange}
            />
            <Input
              type="text"
              placeholder="Todo Item"
              name="name"
              value={form.todo}
              onchange={onInputChange}
            />

            {/* time details */}
            <div className="timeDurationWrapper">
              <div className="timeWrapper">
                <div className="time">
                  <Input
                    type="time"
                    name="startTime"
                    id="startTime"
                    labelClassName="startTime"
                    labelName="Start Time"
                    value={form.startTime}
                    onchange={onInputChange}
                  />
                </div>
                &nbsp;
                <div>
                  <Input
                    type="time"
                    name="endTime"
                    id="endTime"
                    labelClassName="endTime"
                    labelName="End Time"
                    value={form.endTime}
                    onchange={onInputChange}
                  />
                </div>
                &nbsp;&nbsp;
              </div>
              <div>
                <span>Duration</span>
              </div>
            </div>

            {/* check box */}
            {/* remind me to start and end task */}

            {/* submit button */}
            <Button
              name="Add Todo"
              classButtonName="button"
              onclick={onClickAddTodoButton}
            />
            <br />
          </Tabs>
          <div className="generalAnalytics"></div>
        </div>

        <br />
        <br />

        {/* ongoing todo */}
        <div className="secondRowTodo">
          <Tabs
            todoTitleIcon={Walk}
            title="Tasks in Progress"
            showBody={form.showOngoingTodo}
            onClickArrow={onClickArrowOngoingTodo}
          >
            <OngoingTodo />
          </Tabs>
        </div>

        <br />
        <br />

        {/* completed todo */}
        <div className="thirdRowTodo">
          <Tabs
            todoTitleIcon={Love}
            title="Tasks Completed"
            showBody={form.showCompletedTodo}
            onClickArrow={onClickArrowOnCompletedTodo}
          >
            <CompletedTodo />
          </Tabs>
        </div>
      </div>
      <div id="snackbar"></div>
    </Layout>
  )
}

export default CreateTodo
