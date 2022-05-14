import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { useSubmit } from '../../hooks/useSubmit'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import load from '../../img/three-dots.svg'

const SignUnForm = () => {
  const navigate = useNavigate()
  const { disableBtn, errorServer, submitForm } = useSubmit()

  const { register, watch, handleSubmit, formState } = useForm({
    mode: 'onBlur'
  })
  const { errors } = formState

  const password = useRef()
  password.current = watch('password')
  const onSubmit = (data) => submitForm('registerNewUser', data, navigate)
  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-wrapp">
            <label>Username</label>
            <input
              className={`form-input ${errors.user && 'input-error'}`}
              type="text"
              autoFocus={true}
              placeholder="Username"
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
          <div className="form-wrapp ">
            <label>Repeat Password</label>
            <input
              className={`form-input ${errors.repeatPass && 'input-error'}`}
              type="password"
              placeholder="Password"
              {...register('repeatPass', {
                required: true,
                validate: (value) => value === password.current
              })}
            />
            {errors.repeatPass && errors.repeatPass.type === 'validate' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Passwords must match
              </p>
            )}
          </div>
          <div className="form-wrapp wrapp-agree">
            <input
              className={`form-input ${errors.agree && 'input-error'}`}
              type="checkbox"
              defaultChecked
              {...register('agree', {
                required: 'This is required'
              })}
            />

            <span className="form-agree">
              I agree to the processing of my personal information
            </span>
            <ErrorMessage errors={errors} type={'agree'} />
          </div>
          {errorServer && (
            <p style={{ color: 'red', marginBottom: '0', fontSize: '11px' }}>
              Error server, try it again
            </p>
          )}
          <button
            className="form-btn"
            type="submit"
            name="submit"
            style={
              disableBtn ? { cursor: 'default', background: '#1f74c3' } : null
            }
            disabled={disableBtn}
          >
            Create
          </button>
          <div className="form-descr ">
            Already have an account?
            <Link className="router-link" to="/sign-in">
              Sign In.
            </Link>
            {disableBtn ? (
              <img className="submitting" src={load} alt="loading" />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUnForm
