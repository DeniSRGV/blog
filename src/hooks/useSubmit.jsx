import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../redux/actions/authActions'
import ServiceApi from '../services/ServiceApi'
export const useSubmit = () => {
  const [errorServer, setErrorServer] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)
  const serviceApi = new ServiceApi()
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => setDisableBtn(false), 20)
  }, [disableBtn])
  const submitForm = (userFunc, data, nav) => {
    setDisableBtn(true)
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
  }
  return { errorServer, submitForm, disableBtn }
}
