import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    // navigate('/login')
  }
  return (
    <nav>
      <span>header</span>
      <div>
        {user ?
          <div>
            <span>
              <Link to={'/login'} onClick={onLogout}>Logout</Link>
            </span>
            <span>
              <Link to={'/profile'} >Profile</Link>
            </span>
          </div>
          :
          <>
            <span>
              <Link to={'/login'}>Login</Link>
            </span>
            <span>
              <Link to={'/register'}>Register</Link>
            </span>
          </>
        }
      </div>
    </nav>
  )
}

export default Header