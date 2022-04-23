import { Link } from 'react-router-dom'

const UnregisteredUser = () => {
  return (
    <div className="auth">
      <Link to="/sign-in">
        <button className="auth-btn">Sign In</button>
      </Link>

      <Link to="/sign-up">
        <button className="auth-btn">Sign Up</button>
      </Link>
    </div>
  )
}
export default UnregisteredUser
