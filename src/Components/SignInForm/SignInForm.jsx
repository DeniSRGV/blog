import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { useSubmit } from '../../hooks/useSubmit'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import load from '../../img/three-dots.svg'
const SignInForm = () => {
  const [dis, setDis] = useState(false)
  const { errorServer, submitForm } = useSubmit()
  const navigate = useNavigate()

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur'
  })
  const { errors, isSubmitting } = formState
  useEffect(() => {
    isSubmitting ? setDis(true) : setTimeout(() => setDis(false), 10)
  }, [isSubmitting])
  const subF = (data) => {
    submitForm('authUser', data, navigate)
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
              autoFocus={true}
              placeholder="Email address"
              {...register('email', {
                required: 'This field is required!',
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi,
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
          <button
            className="form-btn"
            type="submit"
            name="submit"
            style={dis ? { cursor: 'default', background: '#1f74c3' } : null}
            disabled={dis}
          >
            Login
          </button>
          <div className="form-descr">
            Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
            {dis ? (
              <img className="submitting" src={load} alt="loading" />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignInForm
