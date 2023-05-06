import axios, { AxiosError } from 'axios'

export const looksrareClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOOKSRARE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // Set a timeout for requests
})

looksrareClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    throw error
  },
)
