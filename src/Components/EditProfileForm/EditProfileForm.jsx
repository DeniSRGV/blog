import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ServiceApi from '../../services/ServiceApi'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { setUser } from '../../redux/actions/authActions'
const EditProfileForm = () => {
  const serviceApi = new ServiceApi()
  const dispatch = useDispatch()
  const [errorServer, setErrorServer] = useState(false)
  const navigate = useNavigate()
  const { userObj } = useSelector((state) => state.auth)
  const { token, email, image, username } = userObj
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })
  const submitForm = (data) => {
    serviceApi.updateUser(data, token).then((res) => {
      if (res.user) {
        dispatch(setUser(res.user))
        localStorage.setItem('user', JSON.stringify(res.user))
        navigate('/')
      }
      if (res.errors) {
        setErrorServer(true)
      }
    })
    reset()
  }
  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="form-wrapp">
            <label>Username</label>
            <input
              className={`form-input ${errors.username && 'input-error'}`}
              type="text"
              placeholder="Username"
              defaultValue={username}
              {...register('username', {
                required: 'This is required',
                minLength: {
                  value: 6,
                  message: 'Min length 6 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Max length 20 characters'
                }
              })}
            />
            <ErrorMessage errors={errors} type={'username'} />
          </div>
          <div className="form-wrapp">
            <label>Email address</label>
            <input
              className={`form-input ${errors.email && 'input-error'}`}
              type="text"
              placeholder="Email address"
              defaultValue={email}
              {...register('email', {
                required: 'This field is required!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email'
                }
              })}
            />
            <ErrorMessage errors={errors} type={'email'} />
          </div>
          <div className="form-wrapp">
            <label>New Password</label>
            <input
              className={`form-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="New password"
              {...register('password', {
                required: 'This is required',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.'
                },
                maxLength: {
                  value: 40,
                  message:
                    'Your password must be no more than 40 characters long.'
                }
              })}
            />
            <ErrorMessage errors={errors} type={'password'} />
          </div>
          <div className="form-wrapp">
            <label>Avatar image (url)</label>
            <input
              className={`form-input ${errors.image && 'input-error'}`}
              type="text"
              placeholder="Avatar image"
              defaultValue={image}
              {...register('image', {
                pattern: {
                  value:
                    /(http?|https?):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi,
                  message: 'Invalid URL'
                }
              })}
            />
            <ErrorMessage errors={errors} type={'image'} />
          </div>
          {errorServer && (
            <p style={{ color: 'red', marginBottom: '0' }}>
              Incorrect information.
            </p>
          )}
          <button className="form-btn btn-edit" type="submit" name="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
export default EditProfileForm
