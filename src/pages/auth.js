import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import "../components/LP/Auth/login.css"
import Input from "../components/common/inputs/input"
import "../components/common/toast/toast.css"
import { server } from "../utils/baseUrl"
import { navigate, useStaticQuery, graphql } from "gatsby"
import { Loader } from "../components/common/loader"
import SEO from "../components/seo"

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

  // submit/create user account
  const CreateAccount = () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      alert("All fields are required*")
    } else if (!validateEmail(form.email)) {
      alert("Invalid Email, should be as myname@example.com")
    } else {
      server
        .post(`${apiBaseUrl}/auth/register`, form)
        .then(function (response) {
          localStorage.setItem("token", response.data.token)
          navigate("/todo")
        })
        .catch(function (error) {
          alert(error.response.data.message)
        })
    }
  }

  // login user
  const LoginUserAccount = () => {
    if (form.email === "" || form.password === "") {
      alert("All fields are required*")
    } else if (!validateEmail(form.email)) {
      alert("Invalid Email, should be as myname@example.com")
    } else {
      server
        .post(`${apiBaseUrl}/auth/login`, form)
        .then(function (response) {
          localStorage.setItem("token", response.data.token)
          navigate("/todo")
        })
        .catch(function (error) {
          alert(error.response.data.message)
        })
    }
  }

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
          <main style={{ paddingTop: '8rem' }}>
            <div className="loginContainer" id="container">
            {/* sign in */}
            <div className="form-container sign-in-container">
              <div className="authFormWrapper">
                <h1>Sign in</h1>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onchange={onInputChange}
                />
                <Input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={form.password}
                  onchange={onInputChange}
                />
                <button onClick={LoginUserAccount}>Sign In</button>
              </div>
            </div>

            {/* sign up */}
            <div className="form-container sign-up-container">
              <div className="authFormWrapper">
                <h2>Create Account</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={form.name}
                  onchange={onInputChange}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onchange={onInputChange}
                />
                <Input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={form.password}
                  onchange={onInputChange}
                />
                <button onClick={CreateAccount}>Sign Up</button>
              </div>
            </div>

            {/* overlay */}
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected, please login with your personal info</p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => onClickSignInButton()}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={() => onClickSignUpButton()}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          </main>
        </Layout>
      )}
    </div>
  )
}

export default Login
