import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjU2NjAyZjM5M2ViMWY4YjVmNGM0NSIsImVtYWlsIjoibmljQGdtYWlsLmNvbSIsImlhdCI6MTU5NTY4NTA3N30.l1QKB0YosDswZyyqKbdL9yrQH-NYPcmpKzqBF09NS_I'
    },
})

export { server }
