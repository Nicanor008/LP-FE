import axios from "axios"

const server =
  typeof window !== "undefined" &&
  axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })

export { server }
