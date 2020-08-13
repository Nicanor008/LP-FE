import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import "../components/LP/Auth/login.css"
import Input from "../components/common/inputs/input"
import "../components/common/toast/toast.css"
import { server } from "../utils/baseUrl"
import { navigate, useStaticQuery, graphql } from "gatsby"

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
  const [form, setState] = useState({
    name: "",
    email: "",
    password: "",
  })

  // on change event
  const onInputChange = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // submit/create user account
  const CreateAccount = () => {
    var x = document.getElementById("snackbar")
    if (form.name === "" || form.email === "" || form.password === "") {
      x.className = "show"
      x.innerHTML = "All fields are required*"
      x.style.backgroundColor = "#f3648c"
      return setTimeout(function () {
        x.className = x.className.replace("show", "")
      }, 3000)
    } else if (!validateEmail(form.email)) {
      x.className = "show"
      x.innerHTML = "Invalid Email, should be as myname@example.com"
      x.style.backgroundColor = "#f3648c"
      return setTimeout(function () {
        x.className = x.className.replace("show", "")
      }, 3000)
    } else {
      server
        .post(`${apiBaseUrl}/auth/register`, form)
        .then(function (response) {
          x.className = "show"
          x.innerHTML = response.data.message
          x.style.backgroundColor = "#585df6"
          return setTimeout(function () {
            x.className = x.className.replace("show", "")
          }, 4000)
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

  // login user
  const LoginUserAccount = () => {
    var x = document.getElementById("snackbar")
    if (form.email === "" || form.password === "") {
      x.className = "show"
      x.innerHTML = "All fields are required*"
      x.style.backgroundColor = "#f3648c"
      return setTimeout(function () {
        x.className = x.className.replace("show", "")
      }, 3000)
    } else if (!validateEmail(form.email)) {
      x.className = "show"
      x.innerHTML = "Invalid Email, should be as myname@example.com"
      x.style.backgroundColor = "#f3648c"
      return setTimeout(function () {
        x.className = x.className.replace("show", "")
      }, 3000)
    } else {
      server
        .post(`${apiBaseUrl}/auth/login`, form)
        .then(function (response) {
          x.className = "show"
          x.innerHTML = response.data.message
          localStorage.setItem("token", response.data.token)
          x.style.backgroundColor = "#585df6"
          navigate("/todo")
          return setTimeout(function () {
            x.className = x.className.replace("show", "")
          }, 4000)
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

  const onClickSignUpButton = () => {
    document.getElementById("container").classList.add("right-panel-active")
  }

  const onClickSignInButton = () => {
    document.getElementById("container").classList.remove("right-panel-active")
  }

  return (
    <Layout height={height - 175}>
      <div className="loginContainer" id="container">
        {/* sign up */}
        <div className="form-container sign-up-container">
          <div className="authFormWrapper">
            <h1>Create Account</h1>
            {/* social oauth */}
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            {/* <span>or use your email for registration</span> */}

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
            {/* <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" /> */}
            <button onClick={CreateAccount}>Sign Up</button>
          </div>
        </div>

        {/* sign in */}
        <div className="form-container sign-in-container">
          <div className="authFormWrapper">
            <h1>Sign in</h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span> */}
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
            {/* <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" /> */}
            {/* <a href="#">Forgot your password?</a> */}
            <button onClick={LoginUserAccount}>Sign In</button>
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
      <div id="snackbar"></div>
    </Layout>
  )
}

export default Login
