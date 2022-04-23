import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logoutUser } from '../../../redux/actions/authActions'
import Avatar from '../../../img/user-logo.png'

const RegisteredUser = ({ userObj }) => {
  const dispatch = useDispatch()

  const { username, image } = userObj

  const logout = () => {
    dispatch(logoutUser())
    localStorage.removeItem('user')
  }
  return (
    <div className="user-block">
      <div className="auth">
        <button className="auth-btn auth-btn-create">Create article</button>
        <Link to="/profile" style={{ display: 'inherit' }}>
          <div className="user-name">{username}</div>
          <div className="article-photo user-photo">
            <img src={image || Avatar} alt="avatar-user" />
          </div>
        </Link>
        <Link to="/">
          <button onClick={logout} className="auth-btn auth-btn-logout">
            Log Out
          </button>
        </Link>
      </div>
    </div>
  )
}
export default RegisteredUser
