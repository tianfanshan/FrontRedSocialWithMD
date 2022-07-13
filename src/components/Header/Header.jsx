import './Header.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { logout, resetLogout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { notification } from 'antd'
import { HomeOutlined, UserOutlined, LogoutOutlined, LoginOutlined, SolutionOutlined } from '@ant-design/icons'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, logoutMessage, isLogoutSuccess } = useSelector((state) => state.auth)

  const onLogout =async (e) => {
    e.preventDefault()
    await dispatch(logout())
    if (isLogoutSuccess) {
      notification.success({
        message: logoutMessage
      })
    }
    await dispatch(resetLogout())
     dispatch(navigate('/'))
  }

  return (
    <nav>
      <div className='header'>
        {user ?
          <>
            <span>
              <Link to={'/login'} onClick={onLogout}>
                <LogoutOutlined /><br />
                <span>Logout</span>
              </Link>
            </span>
            <span>
              <Link to={'/profile'} >
                <UserOutlined /><br />
                <span>Profile</span>
              </Link>
            </span>
            <span>
              <Link to={'/'} >
                <HomeOutlined /><br />
                <span>Home</span>
              </Link>
            </span>
          </>
          :
          <>
            <span>
              <Link to={'/login'}>
                <LoginOutlined /><br />
                <span>Login</span>
              </Link>
            </span>
            <span>
              <Link to={'/register'}>
                <SolutionOutlined /><br />
                <span>Register</span>
              </Link>
            </span>
            <span>
              <Link to={'/'} >
                <HomeOutlined /><br />
                <span>Home</span>
              </Link>
            </span>
          </>
        }
      </div>
    </nav>
  )
}

export default Header