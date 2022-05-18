import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../redux/actions/authActions'
import ServiceApi from '../services/ServiceApi'
export const useSubmit = () => {
  const [errorServer, setErrorServer] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  const serviceApi = new ServiceApi()
  const dispatch = useDispatch()
  const submitForm = (userFunc, data, nav) => {
    setDisableBtn(true)
    serviceApi[userFunc](data).then((res) => {
      if (res.user) {
        dispatch(setUser(res.user))
        localStorage.setItem('user', JSON.stringify(res.user))
        nav('/')
        setDisableBtn(false)
      }
      if (res.errors) {
        'email or password' in res.errors
          ? setErrorServer(
              `Email or password ${res.errors['email or password']}`
            )
          : null

        'email' in res.errors ? setEmailError(res.errors.email) : null
        'username' in res.errors ? setNameError(res.errors.username) : null
        setDisableBtn(false)
      }
    })
  }
  return {
    disableBtn,
    errorServer,
    submitForm,
    setErrorServer,
    nameError,
    emailError,
    setEmailError,
    setNameError
  }
}
