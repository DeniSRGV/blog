import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
const SignUnForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })
  const password = useRef()
  password.current = watch('password')
  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Create new account</h2>
        <form>
          <div className="form-wrapp">
            <label>Username</label>
            <input
              className={`form-input ${errors.user && 'input-error'}`}
              type="text"
              placeholder="Username"
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
            <label>Password</label>
            <input
              className={`form-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 40
              })}
            />

            {errors.password && errors.password.type === 'required' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                This is required
              </p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Your password needs to be at least 6 characters.
              </p>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Your password must be no more than 40 characters long.
              </p>
            )}
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
              {...register('agree', {
                required: true
              })}
            />

            <span className="form-agree">
              I agree to the processing of my personal information
            </span>
            {errors.agree && (
              <p style={{ color: 'red', marginBottom: '0', fontSize: '11px' }}>
                This is required
              </p>
            )}
          </div>

          <div className="form-btn">Create</div>
          <div className="form-descr ">
            Already have an account?
            <Link className="router-link" to="/sign-in">
              Sign In.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUnForm
