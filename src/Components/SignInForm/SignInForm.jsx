const SignInForm = () => {
  return (
    <div className="article-wrapper">
      <div className="form-container">
        <h2>Sign In</h2>
        <div className="form-wrapp">
          <label>Email address</label>
          <input
            className="form-input"
            type="text"
            placeholder="Email address"
          />
        </div>
        <div className="form-wrapp">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="form-btn">Login</div>
        <div className="form-descr">Don’t have an account? Sign Up.</div>
      </div>
    </div>
  )
}
export default SignInForm
