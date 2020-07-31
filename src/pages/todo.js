import React, { useState, useEffect } from "react"
import jwt from "jsonwebtoken"
import moment from "moment"
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
    user: "",
    newDataAdded: false,
  })

  // load user token
  useEffect(() => {
    const token = localStorage.getItem("token")
    const activeToken = token && jwt.decode(token.substr(7))

    // calculate duration
    const start = moment(form.startTime, "HH:mm")
    const end = moment(form.endTime, "HH:mm")
    let minutes = end.diff(start, "minutes")
    if (minutes === 0 || form.endTime === "" || form.startTime === "") {
      minutes = ""
    } else if (minutes > 60) {
      minutes = (minutes / 60).toFixed(2) + " hours"
    } else if (minutes === 1) {
      minutes = minutes + " minute"
    } else if (minutes === 60) {
      minutes = 1 + " hour"
    } else {
      minutes = minutes + " minutes"
    }
    token &&
      setState({
        ...form,
        duration: minutes,
        user: activeToken.id,
      })
  }, [form.startTime, form.endTime, form.duration])

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
    if (e.keyCode === 13) {
      var x = document.getElementById("snackbar")
      if (form.duration && form.duration < 1) {
        x.className = "show"
        x.innerHTML = "Duration should be greater than 1 minute"
        x.style.backgroundColor = "#585df6"
        return setTimeout(function () {
          x.className = x.className.replace("show", "")
        }, 3000)
      }
      server
        .post("/todo", form)
        .then(function (response) {
          x.className = "show"
          x.innerHTML = response.data.message
          x.style.backgroundColor = "#585df6"
          setState({
            ...form,
            newDataAdded: true,
          })
          return setTimeout(function () {
            setState({
              ...form,
              newDataAdded: false,
            })
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
  }

  // close create todo body
  const onClickArrowOnCreateTodo = e => {
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
              onKeyPress={onClickAddTodoButton}
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
                {form.duration !== "" && (
                  <>
                    <span>Duration</span>
                    <br />
                    <p style={{ paddingTop: "0.8rem" }} id="duration">
                      {form.duration}
                    </p>
                  </>
                )}
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
            {form.user !== "" && <OngoingTodo newData={form.newDataAdded} />}
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
            {form.user !== "" && <CompletedTodo />}
          </Tabs>
        </div>
      </div>
      <div id="snackbar"></div>
    </Layout>
  )
}

export default CreateTodo
