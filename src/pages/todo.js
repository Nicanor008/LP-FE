import { Box } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { navigate } from "gatsby";
import {jwtDecode} from "jwt-decode";
import moment from "moment";
import SEO from "../components/seo";
import Layout from "../components/layout";
import "../components/LP/Todo/todo.scss";
import SecondRowTodo from "../components/LP/Todo/secondRowTodo";
import { Loader } from "../components/common/loader";
import { CreateTodo, InProgressAndCompletedTodo } from "../components/LP/Todo";

const TodoDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: "",
    tags: "",
    name: "",
    startTime: "",
    endTime: "",
    duration: "",
    user: "",
    durationInteger: 0,
    newDataAdded: false,
    newCompletedData: false
  });

  const initializeSessionState = useCallback(() => {
    const session = sessionStorage.getItem("showCreateTodo");
    setForm((prevForm) => ({
      ...prevForm,
      showCreateTodo: session ?? true,
      showOngoingTodo: sessionStorage.getItem("showOngoingTodo") ?? true,
      showCompletedTodo: sessionStorage.getItem("showCompletedTodo") ?? true,
    }));
  }, []);

  const calculateDuration = useCallback(() => {
    const start = moment(form.startTime, "HH:mm");
    const end = moment(form.endTime, "HH:mm");
    const minutes = end.diff(start, "minutes");

    if (!form.startTime || !form.endTime || minutes <= 0) {
      return { duration: "", durationInteger: 0 };
    }

    const hours = minutes / 60;
    const formattedDuration =
      minutes > 60
        ? `${hours.toFixed(2)} hours`
        : minutes === 1
        ? "1 minute"
        : `${minutes} minutes`;

    return { duration: formattedDuration, durationInteger: +hours.toFixed(2) };
  }, [form.startTime, form.endTime]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/auth");

    const activeToken = token && jwtDecode(token.slice(7));
    initializeSessionState();

    const { duration, durationInteger } = calculateDuration();
    setForm((prevForm) => ({
      ...prevForm,
      user: activeToken.id,
      duration,
      durationInteger,
    }));

    setLoading(false);
  }, [calculateDuration, initializeSessionState]);

  return loading ? (
    <Box style={{ marginTop: "20%" }}>
      <center>
        <Loader />
      </center>
    </Box>
  ) : (
    <Layout isDashboard={true}>
      <SEO
        title="Todo"
        description="Create Todo, view ongoing todo, view completed todo, real-time date, time and weather, random quotes, and automatic real-time todo analytics"
      />
      <Box
        className="allTodoWrapper"
        style={{ minHeight: `calc(100vh - 4.5rem)`, paddingTop: "4rem" }}
      >
        <Box className="createTodoWrapper">
          <CreateTodo form={form} setState={setForm} />

          <InProgressAndCompletedTodo form={form} setState={setForm} />
        </Box>
        <SecondRowTodo />
      </Box>
      <Box id="snackbar"></Box>
    </Layout>
  );
};

export default TodoDashboard;
