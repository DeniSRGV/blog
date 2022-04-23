import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ServiceApi from '../../services/ServiceApi'
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
              className={`form-input ${errors.user && 'input-error'}`}
              type="text"
              placeholder="Username"
              defaultValue={username}
              {...register('user', {
                required: true,
                minLength: 3,
                maxLength: 20
              })}
            />

            {errors.user && errors.user.type === 'required' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                This is required
              </p>
            )}
            {errors.user && errors.user.type === 'minLength' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Min length 6 characters
              </p>
            )}
            {errors.user && errors.user.type === 'maxLength' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                MAx length 20 characters
              </p>
            )}
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

            {errors.email && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-wrapp">
            <label>New Password</label>
            <input
              className={`form-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="New password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 40
              })}
            />
            {errors.password && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Min length 6 characters
              </p>
            )}
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
                    /(http?|https?):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
                }
              })}
            />
            {errors.image && (
              <p style={{ color: 'red', marginBottom: '0' }}>Invalid URL</p>
            )}
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
