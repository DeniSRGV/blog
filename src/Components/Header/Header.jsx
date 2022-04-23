import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setUser } from '../../redux/actions/authActions'

import RegisteredUser from './RegisteredUser/RegisteredUser'
import UnregisteredUser from './UnregisteredUser/UnregisteredUser'

const Header = () => {
  const dispatch = useDispatch()
  const { isLogin, userObj } = useSelector((state) => state.auth)
  const userProfile = isLogin ? (
    <RegisteredUser userObj={userObj} />
  ) : (
    <UnregisteredUser />
  )
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    localUser && dispatch(setUser(localUser))
  }, [dispatch])
  return (
    <header className="header">
      <Link to="/">
        <div className="logo">Realworld Blog</div>
      </Link>
      {userProfile}
    </header>
  )
}
export default Header
