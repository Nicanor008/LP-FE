import { Box } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { navigate } from "gatsby";
import {jwtDecode} from "jwt-decode";
import SEO from "../components/seo";
import Layout from "../components/layout";
import "../components/LP/Todo/todo.scss";
import SecondRowTodo from "../components/LP/Todo/secondRowTodo";
import { CreateTodo, InProgressAndCompletedTodo } from "../components/LP/Todo";
import { Loader } from "../components/common";

const TodoDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    showCreateTodo: false,
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/auth");

    const activeToken = token && jwtDecode(token.slice(7));
    initializeSessionState();

    setForm((prevForm) => ({
      ...prevForm,
      user: activeToken.id,
    }));

    setLoading(false);
  }, [initializeSessionState]);

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
        style={{ minHeight: `calc(100vh - 9rem)`, overflow: 'scroll' }}
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
