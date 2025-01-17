import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UseAuth from './UseAuth'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
const useAxiosSecures = () => {
  const { logOut } = UseAuth()
  const navigate = useNavigate()
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        // console.log('error tracked in the interceptor', error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          await logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])

  return axiosSecure
}

export default useAxiosSecures