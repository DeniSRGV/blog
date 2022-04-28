import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { useSubmit } from '../../hooks/useSubmit'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
const SignInForm = () => {
  const { errorServer, submitForm } = useSubmit()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })
  const subF = (data) => {
    submitForm('authUser', data, navigate, reset)
  }

  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(subF)}>
          <div className="form-wrapp">
            <label>Email address</label>
            <input
              className={`form-input ${errors.email && 'input-error'}`}
              type="text"
              placeholder="Email address"
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
            <label>Password</label>
            <input
              className={`form-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Min length 6 characters'
                },
                maxLength: {
                  value: 40,
                  message: 'Incorrect username or password.'
                }
              })}
            />
            <ErrorMessage errors={errors} type={'password'} />
          </div>
          {errorServer && (
            <p style={{ color: 'red', marginBottom: '0' }}>
              Incorrect username or password.
            </p>
          )}
          <button className="form-btn" type="submit" name="submit">
            Login
          </button>
          <div className="form-descr">
            Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignInForm
