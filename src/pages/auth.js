import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import "../components/LP/Auth/login.css"
import "../components/common/toast/toast.css"
import { server } from "../utils/baseUrl"
import { navigate, useStaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import { Box, Button } from "@chakra-ui/react"
import axios from "axios"
import { InputWithLabel, Loader } from "../components/common"

// return action window dimensions
function getWindowDimensions() {
  let window = {}
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

// validate email
function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// get current window dimensions
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

// get base url
function useBaseUrl() {
  const data = useStaticQuery(graphql`
    query SiteUrlQuery {
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

const Login = () => {
  const { height } = useWindowDimensions()
  const apiBaseUrl = useBaseUrl()
  const [loading, setLoading] = useState(true)
  const [form, setState] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loadingSignup, setLoadingSignup] = useState(false)
  const [loadingSignin, setLoadingSignin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setLoading(true)
      return navigate("/todo")
    }
    setLoading(false)
  }, [])

  // on change event
  const onInputChange = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    console.log('Loading Signin State:', loadingSignin);
  }, [loadingSignin]);
  

  // submit/create user account
  const CreateAccount = async () => {
    setLoadingSignup(true)
    try {
      if (form.name === "" || form.email === "" || form.password === "") {
        alert("All fields are required*")
        setLoadingSignup(false)
        return;
      } else if (!validateEmail(form.email)) {
        alert("Invalid Email, should be as myname@example.com")
        setLoadingSignup(false)
        return;
      } else {
        await server
          .post(`${apiBaseUrl}/auth/register`, form)
          .then(function (response) {
            localStorage.setItem("token", response.data.token)
            navigate("/todo")
            setLoadingSignup(false)
          })
          .catch(function (error) {
            alert(error?.response?.data?.message)
            setLoadingSignup(false)
            return;
          })
      }
    } catch (error) {
      setLoadingSignup(false);
      alert(error?.response?.data?.message || "Login failed");
    }
  }

  // login user
  const LoginUserAccount = async () => {
    setLoadingSignin(true);
    try {
      if (form.email === "" || form.password === "") {
        alert("All fields are required*");
        return setLoadingSignin(false);
      }
  
      if (!validateEmail(form.email)) {
        alert("Invalid Email, should be as myname@example.com");
        return setLoadingSignin(false);
      }
  
      const response = await axios.post(`${apiBaseUrl}/auth/login`, form);

      localStorage.setItem("token", response.data.token);

      setLoadingSignin(false);
      navigate("/todo");
    } catch (error) {
      setLoadingSignin(false);
      alert(error?.response?.data?.message || "Login failed");
    }
  };  
  

  const onClickSignUpButton = () => {
    document.getElementById("container").classList.add("right-panel-active")
  }

  const onClickSignInButton = () => {
    document.getElementById("container").classList.remove("right-panel-active")
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
        <Layout height={height && height - 15}>
          <SEO title="Sign In|Up" description="Sign in or sign up to LP" />
          <main style={{ minHeight: '70vh' }}>
            <Box className="loginContainer" id="container" h="78vh" minH="100%">
            {/* sign in */}
            <div className="form-container sign-in-container">
              <div className="authFormWrapper">
                <h1>Sign in</h1>
                <InputWithLabel
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={onInputChange}
                />
                <InputWithLabel
                  type="password"
                  placeholder="password"
                  name="password"
                  value={form.password}
                  onChange={onInputChange}
                />
                <Button onClick={LoginUserAccount} bg="#796FED" color="white" isLoading={loadingSignin} loadingText="Signing In ...">Sign In</Button>
              </div>
            </div>

            {/* sign up */}
            <div className="form-container sign-up-container">
              <div className="authFormWrapper">
                <h2>Create Account</h2>
                <InputWithLabel
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onChange={onInputChange}
                />
                <InputWithLabel
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={onInputChange}
                />
                <InputWithLabel
                  type="password"
                  placeholder="password"
                  name="password"
                  value={form.password}
                  onChange={onInputChange}
                />
                <Button isLoading={loadingSignup} loadingText="Creating Account ..." onClick={CreateAccount} bg="#796FED" color="white">Sign Up</Button>
              </div>
            </div>

            {/* overlay */}
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected, please login with your personal info</p>
                  <Button
                    onClick={() => onClickSignInButton()}
                    bg="transparent"
                    borderColor="#ffffff"
                    color="white"
                  >
                    Sign In
                  </Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <Button
                    onClick={() => onClickSignUpButton()}
                    bg="transparent"
                    borderColor="#ffffff"
                    color="white"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </Box>
          </main>
        </Layout>
      )}
    </div>
  )
}

export default Login
