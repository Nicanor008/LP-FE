import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': (typeof window !== 'undefined') && localStorage.getItem('token')
    }
})

export { server }
