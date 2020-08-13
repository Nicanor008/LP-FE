import axios from 'axios'

const server = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': (typeof window !== 'undefined') && localStorage.getItem('token')
    }
})

export { server }

