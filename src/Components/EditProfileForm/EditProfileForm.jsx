import React from 'react'
import { useForm } from 'react-hook-form'

const EditProfileForm = () => {
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
        <h2>Edit Profile</h2>
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
          <div className="form-btn btn-edit">Save</div>
        </form>
      </div>
    </div>
  )
}
export default EditProfileForm
