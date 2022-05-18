import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import classnames from 'classnames'

import { useSubmit } from '../../hooks/useSubmit'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import load from '../../img/three-dots.svg'
const SignInForm = () => {
  const { disableBtn, errorServer, submitForm, setErrorServer } = useSubmit()

  const navigate = useNavigate()
  console.log('render')
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur'
  })
  const { errors } = formState

  const subF = (data) => {
    submitForm('authUser', data, navigate)
  }

  const formBtn = classnames({
    'form-btn': true,
    'form-btn-dis': disableBtn
  })
  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(subF)}>
          <div className="form-wrapp">
            <label>Email address</label>
            <input
              className={`form-input ${
                errors.email || (errorServer && 'input-error')
              }`}
              type="text"
              autoFocus
              placeholder="Email address"
              onFocus={() => setErrorServer('')}
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
              className={`form-input ${
                errors.password || (errorServer && 'input-error')
              }`}
              type="password"
              placeholder="Password"
              onFocus={() => setErrorServer('')}
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
          {errorServer && <p className="error-server">{errorServer}</p>}
          <button
            className={formBtn}
            type="submit"
            name="submit"
            disabled={disableBtn}
          >
            Login
          </button>
          <div className="form-descr">
            Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
            {disableBtn ? (
              <img className="submitting" src={load} alt="loading" />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignInForm
