import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { notification } from 'antd'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, message, isSuccess } = useSelector((state) => state.auth)

  const onLogout = (e) => {
    e.preventDefault()
    if (isSuccess) {
      notification.success({
        message: message
      })
    }
    setTimeout(()=>{
      navigate('/login')
    },3000)
    dispatch(logout())
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
            <span>
              <Link to={'/'} >Home</Link>
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
            <span>
              <Link to={'/'} >Home</Link>
            </span>
          </>
        }
      </div>
    </nav>
  )
}

export default Header