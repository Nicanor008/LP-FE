import React, { useState, useEffect } from "react"
import jwt from "jsonwebtoken"
import moment from "moment"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Tabs from "../components/LP/Todo/tabs"
import "../components/LP/Todo/todo.scss"
import WriteSmall from "../images/icons/write-small.svg"
import OngoingTodo from "../components/LP/Todo/ongoingTodo"
import CompletedTodo from "../components/LP/Todo/completingTodo"
import { server } from "../utils/baseUrl"
import CreateTodoInputs from "../components/LP/Todo/createTodo"
import axios from "axios"
import { useStaticQuery, graphql, navigate } from "gatsby"
import SecondRowTodo from "../components/LP/Todo/secondRowTodo"
import { Loader } from "../components/common/loader"

// get base url hook
function useBaseUrl() {
  const data = useStaticQuery(graphql`
    query SiteTitlerQuery {
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

const CreateTodo = () => {
  const apiBaseUrl = useBaseUrl()
  const [loading, setLoading] = useState(true)
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
    newCompletedData: false,
  })

  // load user token
  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("token")
    const activeToken = token && jwt.decode(token.substr(7))

    if (!token) {
      return navigate("/auth")
    }

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
    setLoading(false)
  }, [form.startTime, form.endTime, form.duration, apiBaseUrl])

  // on change event
  const onInputChange = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // var x = document.getElementById("snackbar")

  // submit todo
  const onClickAddTodoButton = e => {
    e.preventDefault()
    if (form.duration && form.duration < 1) {
      // x.className = "show"
      // x.innerHTML = "Duration should be greater than 1 minute"
      // x.style.backgroundColor = "#585df6"
      // return setTimeout(function () {
      //   // x.className = x.className.replace("show", "")
      // }, 3000)
    }
    axios
      .post(`${apiBaseUrl}/todo`, form)
      .then(function (response) {
        // x.className = "show"
        // x.innerHTML = response.data.message
        // x.style.backgroundColor = "#585df6"
        setState({
          ...form,
          category: "",
          tags: "",
          name: "",
          startTime: "",
          endTime: "",
          newDataAdded: !form.newDataAdded,
        })
      })
      .catch(function (error) {
        // x.className = "show"
        // x.innerHTML = error.response.data.message
        // x.style.backgroundColor = "#f3648c"
        // return setTimeout(function () {
        //   x.className = x.className.replace("show", "")
        // }, 3000)
        alert(error.response.data.message)
      })
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

  // edit/update todo item - mark as done and undone
  const editTodoItem = props => {
    setState({ ...form, loading: true })
    server
      .patch(`${apiBaseUrl}/todo/status/${props.id}`, {
        completed: props.complete,
      })
      .then(response => {
        // x.className = "show"
        // x.innerHTML = response.data.message
        // x.style.backgroundColor = "#585df6"
        setState({
          ...form,
          newDataAdded: !form.newDataAdded,
          newCompletedData: !form.newCompletedData,
          loading: false,
        })
      })
      .catch(e => {
        // x.className = "show"
        // x.innerHTML = e.response.data.message
        // x.style.backgroundColor = "#f3648c"
        // return setTimeout(function () {
        //   x.className = x.className.replace("show", "")
        // }, 3000)
        alert(e.response.data.message)
      })
  }

  // delete todo
  const deleteTodoItem = props => {
    server
      .patch(`${apiBaseUrl}/todo/archive/${props.id}`, { archived: false })
      .then(response => {
        // x.className = "show"
        // x.innerHTML = response.data.message
        // x.style.backgroundColor = "#585df6"
        if (props.complete) {
          setState({
            ...form,
            newCompletedData: !form.newCompletedData,
          })
        } else {
          setState({
            ...form,
            newDataAdded: !form.newDataAdded,
          })
        }
      })
      .catch(e => {
        // x.className = "show"
        // x.innerHTML = e.response.data.message
        // x.style.backgroundColor = "#f3648c"
        // return setTimeout(function () {
        //   x.className = x.className.replace("show", "")
        // }, 3000)
        alert(e.response.data.message)
      })
  }

  return (
    <div>
      {loading ? (
        <div style={{ marginTop: "20%" }}>
          <center>
            <Loader />
          </center>
        </div>
      ) : (
        <Layout>
          <SEO
            title="Todo"
            description="Create Todo, view ongoing todo, view completed todo, real time date, time and weather, random quotes and automatic real-time todo analytics"
          />
          <div className="allTodoWrapper">
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
                  <CreateTodoInputs
                    onClickAddTodoButton={onClickAddTodoButton}
                    form={form}
                    onInputChange={onInputChange}
                  />
                </Tabs>
                <div className="generalAnalytics"></div>
              </div>

              <br />
              <br />

              {/* ongoing todo */}
              <div className="secondRowTodo">
                {/* {form.user !== "" && ( */}
                <OngoingTodo
                  newData={form.newDataAdded}
                  deleteTodoItem={deleteTodoItem}
                  editTodoItem={editTodoItem}
                  showBody={form.showOngoingTodo}
                  onClickArrow={onClickArrowOngoingTodo}
                />
                {/* )} */}
              </div>

              <br />
              <br />

              {/* completed todo */}
              <div className="thirdRowTodo">
                {/* {form.user !== "" && ( */}
                <CompletedTodo
                  newData={form.newCompletedData}
                  deleteTodoItem={deleteTodoItem}
                  editTodoItem={editTodoItem}
                  showBody={form.showCompletedTodo}
                  onClickArrow={onClickArrowOnCompletedTodo}
                  loader={loading}
                />
                {/* )} */}
              </div>
            </div>

            {/* second row */}
            <div className="secondTodoColumn">
              {/* date, time & weather */}
              {/* <Cards title="Welcome User">
            <div className="thirdRowCardBody">
              <div>
                <h2>15:36:45</h2>
                <p>Tuesday 2nd July</p>
              </div>

              <div>36∞</div>
            </div>
          </Cards> */}
              <SecondRowTodo apiBaseUrl={apiBaseUrl} />
            </div>
          </div>
          <div id="snackbar"></div>
        </Layout>
      )}
    </div>
  )
}

export default CreateTodo
