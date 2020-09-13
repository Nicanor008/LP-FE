import React, { useState, useEffect, } from "react";
import jwt from "jsonwebtoken";
import moment from "moment";
import axios from "axios";
import { useStaticQuery, graphql, navigate, } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Tabs from "../components/LP/Todo/tabs";
import "../components/LP/Todo/todo.scss";
import WriteSmall from "../images/icons/write-small.svg";
import OngoingTodo from "../components/LP/Todo/ongoingTodo";
import CompletedTodo from "../components/LP/Todo/completingTodo";
import CreateTodoInputs from "../components/LP/Todo/createTodo";
import SecondRowTodo from "../components/LP/Todo/secondRowTodo";
import { Loader, } from "../components/common/loader";
import useBaseUrl from "../utils/baseUrl";
import { getToken } from "../utils/getToken";

const CreateTodo = () => {
  const apiBaseUrl = useBaseUrl();
  const [loading, setLoading, ] = useState(true,);
  const [analytics, setAnalytics, ] = useState({
    totalItems: 0,
    todo: {},
    analyticsLoader: true,
  },);
  const [form, setState, ] = useState({
    category: "",
    tags: "",
    name: "",
    startTime: "",
    endTime: "",
    duration: "",
    user: "",
    durationInteger: 0,
    newDataAdded: false,
    newCompletedData: false,
  },);

  const { headers } = getToken();

  // load data
  useEffect(() => {
    // get analytics
    axios.get(`${apiBaseUrl}/analytics/todo`, headers,).then((analytics,) => {
      setAnalytics({
        totalItems: analytics.data.totalItems,
        todo: analytics.data.todo,
        analyticsLoader: false,
      },);
    },);
  },);

  // load user token
  useEffect(() => {
    setLoading(true,);
    const token = localStorage.getItem("token",);
    const activeToken = token && jwt.decode(token.substr(7,),);

    if (!token) {
      return navigate("/auth",);
    }

    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("showCreateTodo",);
      if (session === null) {
        sessionStorage.setItem("showCreateTodo", true,);
        setState({
          ...form,
          showCreateTodo: true,
          showOngoingTodo: true,
          showCompletedTodo: true,
        },);
      } else {
        setState({
          ...form,
          showCreateTodo: session,
          showOngoingTodo: sessionStorage.getItem("showOngoingTodo",),
          showCompletedTodo: sessionStorage.getItem("showCompletedTodo",),
        },);
      }
    }

    // calculate duration
    const start = moment(form.startTime, "HH:mm",);
    const end = moment(form.endTime, "HH:mm",);
    let minutes = end.diff(start, "minutes",);
    let durationInt = 0;
    if (minutes === 0 || form.endTime === "" || form.startTime === "") {
      minutes = "";
      durationInt = 0.0;
    } else if (minutes > 60) {
      durationInt = (minutes / 60).toFixed(2,);
      minutes = `${(minutes / 60).toFixed(2,)} hours`;
    } else if (minutes === 1) {
      minutes += " minute";
      durationInt = 0.1;
    } else if (minutes === 60) {
      minutes = `${1} hour`;
      durationInt = 1.0;
    } else {
      durationInt = minutes / 100;
      minutes += " minutes";
    }

    setState({
      ...form,
      duration: minutes,
      durationInteger: durationInt,
      user: activeToken.id,
    },);

    setLoading(false,);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.startTime,
    form.endTime,
    form.duration,
    apiBaseUrl,
    form.showCreateTodo,
  ],);

  // on change event
  const onInputChange = (e,) => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    },);
  };

  // submit todo
  const onClickAddTodoButton = (e,) => {
    e.preventDefault();
    axios
      .post(`${apiBaseUrl}/todo`, form,)
      .then(() => {
        setState({
          ...form,
          category: "",
          tags: "",
          name: "",
          startTime: "",
          endTime: "",
          newDataAdded: !form.newDataAdded,
        },);
        axios.get(`${apiBaseUrl}/analytics/todo`, headers,).then((analytics,) => {
          setAnalytics({
            totalItems: analytics.data.totalItems,
            todo: analytics.data.todo,
            analyticsLoader: false,
          },);
        },);
      },)
      .catch((error,) => {
        alert(error.response.data.message,);
      },);
  };

  // close create todo body
  const onClickArrowOnCreateTodo = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("showCreateTodo", !form.showCreateTodo,);
      if (form.showCreateTodo === undefined) {
        return setState({
          ...form,
          showCreateTodo: false,
        },);
      }
      return setState({
        ...form,
        showCreateTodo: !form.showCreateTodo,
      },);
    }
  };

  // close ongoing todo body
  const onClickArrowOngoingTodo = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("showOngoingTodo", !form.showOngoingTodo,);
      if (form.showOngoingTodo === undefined) {
        return setState({
          ...form,
          showOngoingTodo: false,
        },);
      }
      return setState({
        ...form,
        showOngoingTodo: !form.showOngoingTodo,
      },);
    }
  };

  // close create todo body
  const onClickArrowOnCompletedTodo = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("showCompletedTodo", !form.showCompletedTodo,);
      if (form.showCompletedTodo === undefined) {
        return setState({
          ...form,
          showCompletedTodo: false,
        },);
      }
      return setState({
        ...form,
        showCompletedTodo: !form.showCompletedTodo,
      },);
    }
  };

  // edit/update todo item - mark as done and undone
  const editTodoItem = (props,) => {
    setState({ ...form, loading: true, analytics: { analyticsLoader: true, }, },);
    axios
      .patch(
        `${apiBaseUrl}/todo/status/${props.id}`,
        {
          completed: props.complete,
        },
        headers,
      )
      .then(() => {
        setState({
          ...form,
          newDataAdded: !form.newDataAdded,
          newCompletedData: !form.newCompletedData,
          loading: false,
        },);
        axios.get(`${apiBaseUrl}/analytics/todo`, headers,).then((analytics,) => {
          setAnalytics({
            totalItems: analytics.data.totalItems,
            todo: analytics.data.todo,
            analyticsLoader: false,
          },);
        },);
      },)
      .catch((e,) => {
        alert(e.response.data.message,);
      },);
  };

  // delete todo
  const deleteTodoItem = (props,) => {
    axios
      .patch(
        `${apiBaseUrl}/todo/archive/${props.id}`,
        { archived: false, },
        headers,
      )
      .then(async () => {
        if (props.complete) {
          setState({
            ...form,
            newCompletedData: !form.newCompletedData,
          },);
        } else {
          setState({
            ...form,
            newDataAdded: !form.newDataAdded,
          },);
        }
        await axios
          .get(`${apiBaseUrl}/analytics/todo`, headers,)
          .then((analytics,) => {
            setAnalytics({
              totalItems: analytics.data.totalItems,
              todo: analytics.data.todo,
              analyticsLoader: false,
            },);
          },);
      },)
      .catch((e,) => {
        alert(e.response.data.message,);
      },);
  };

  return (
    <div>
      {loading ? (
        <div style={{ marginTop: "20%", }}>
          <center>
            <Loader />
          </center>
        </div>
      ) : (
        <Layout>
          <SEO
            title="Todo"
            description="Create Todo, view ongoing todo, view completed todo, real time date, time and weather, random quotes and automatic
              real-time todo analytics"
          />
          <div className="allTodoWrapper">
            <div className="createTodoWrapper">
              <br />
              <div className="FirstRowCreateTodo">
                {/* create todo */}
                <Tabs
                  todoTitleIcon={WriteSmall}
                  title="Write Todo"
                  showBody={
                    form.showCreateTodo === undefined
                      ? true
                      : form.showCreateTodo
                  }
                  onClickArrow={onClickArrowOnCreateTodo}
                >
                  <CreateTodoInputs
                    onClickAddTodoButton={onClickAddTodoButton}
                    form={form}
                    onInputChange={onInputChange}
                  />
                </Tabs>
              </div>

              <br />
              <br />

              {/* ongoing todo */}
              <div className="secondRowTodo">
                <OngoingTodo
                  newData={form.newDataAdded}
                  deleteTodoItem={deleteTodoItem}
                  editTodoItem={editTodoItem}
                  showBody={
                    form.showOngoingTodo === undefined
                      ? true
                      : form.showOngoingTodo
                  }
                  onClickArrow={onClickArrowOngoingTodo}
                  headers={headers}
                  apiBaseUrl={apiBaseUrl}
                />
              </div>

              {/* completed todo */}
              <div className="thirdRowTodo">
                <CompletedTodo
                  newData={form.newCompletedData}
                  deleteTodoItem={deleteTodoItem}
                  editTodoItem={editTodoItem}
                  showBody={
                    form.showCompletedTodo === undefined
                      ? true
                      : form.showCompletedTodo
                  }
                  onClickArrow={onClickArrowOnCompletedTodo}
                  loader={loading}
                  headers={headers}
                  apiBaseUrl={apiBaseUrl}
                />
              </div>
            </div>

            {/* second row */}
            <div className="secondTodoColumn">
              <SecondRowTodo apiBaseUrl={apiBaseUrl} analytics={analytics} />
            </div>
          </div>
          <div id="snackbar" />
        </Layout>
      )}
    </div>
  );
};

export default CreateTodo;
