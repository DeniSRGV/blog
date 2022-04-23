import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../redux/actions/authActions'
import ServiceApi from '../services/ServiceApi'
export const useSubmit = () => {
  const [errorServer, setErrorServer] = useState(false)
  const serviceApi = new ServiceApi()
  const dispatch = useDispatch()

  const submitForm = (userFunc, data, nav, reset) => {
    serviceApi[userFunc](data).then((res) => {
      if (res.user) {
        setErrorServer(false)

        dispatch(setUser(res.user))
        localStorage.setItem('user', JSON.stringify(res.user))
        nav('/')
      }
      if (res.errors) {
        setErrorServer(true)
      }
    })

    reset()
  }
  return { errorServer, submitForm }
}
