import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Realworld Blog</div>
      </Link>
      <div className="auth">
        <Link to="/sign-in">
          <button className="auth-btn">Sign In</button>
        </Link>

        <Link to="/sign-up">
          <button className="auth-btn">Sign Up</button>
        </Link>
      </div>
    </header>
  )
}
export default Header
