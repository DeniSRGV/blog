import React from 'react'

const ErrorMessage = ({ errors, type }) => {
  return (
    <>
      {errors[type] && (
        <p style={{ color: 'red', marginBottom: '0' }}>
          {errors[type].message}
        </p>
      )}
    </>
  )
}
export default ErrorMessage
