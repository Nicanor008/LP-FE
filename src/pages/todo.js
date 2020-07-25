import React, { useState } from "react"
import axios from "axios"
import toastr from 'toastr'
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

const CreateTodo = () => {
  const [form, setState] = useState({
    category: "",
    tags: "",
    name: "",
    startTime: "",
    endTime: "",
    duration: "",
  })

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
    axios
      .post("http://localhost:4000/todo", form)
      .then(function (response) {
        toastr.success(response.data.message)
      })
      .catch(function (error) {
        toastr.error(error.response.data.message)
      })
  }

  return (
    <Layout>
      <SEO title="Create Todo" description="Create Todo" />
      <div className="createTodoWrapper">
      <br />
        <div className="FirstRowCreateTodo">

        {/* create todo */}
          <Tabs todoTitleIcon={WriteSmall} title="Write Todo">
            <Input
              type="text"
              placeholder="Keyword"
              name="category"
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
          </Tabs>
          <div className="generalAnalytics"></div>
        </div>

        <br />
        <br />
        
        {/* ongoing todo */}
        <div className="secondRowTodo">
          <Tabs todoTitleIcon={Walk} title="Tasks in Progress">
            <OngoingTodo />
          </Tabs>
        </div>

        <br />
        <br />

        {/* completed todo */}
        <div className="thirdRowTodo">
          <Tabs todoTitleIcon={Love} title="Tasks Completed">
            
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}

export default CreateTodo
