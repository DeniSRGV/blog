import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Realworld Blog</Link>
      </div>
      <div className="auth">
        <button className="auth-btn">
          <Link to="/sign-in">Sign In</Link>
        </button>
        <button className="auth-btn">Sign Up</button>
      </div>
    </header>
  )
}
export default Header
