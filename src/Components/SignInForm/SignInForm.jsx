import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })
  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Sign In</h2>
        <form>
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
            {errors.password && (
              <p style={{ color: 'red', marginBottom: '0' }}>
                Min length 6 characters
              </p>
            )}
          </div>

          <div className="form-btn">Login</div>
          <div className="form-descr">
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignInForm
