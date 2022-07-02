import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { notification } from 'antd'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, message, isError, isSuccess } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if (isSuccess) {
  //     notification.success({
  //       message: message
  //     })
  //   }
  //   if (isError) {
  //     notification.error({
  //       message: message
  //     })
  //   }
  // }, [isSuccess, isError, message])

  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/login')
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