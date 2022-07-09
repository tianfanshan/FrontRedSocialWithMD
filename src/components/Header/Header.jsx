import './Header.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { notification } from 'antd'
import { HomeOutlined, UserOutlined, LogoutOutlined, LoginOutlined, SolutionOutlined } from '@ant-design/icons'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, logoutMessage, isSuccess } = useSelector((state) => state.auth)

  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    if (isSuccess) {
      notification.success({
        message: logoutMessage
      })
    }
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  return (
    <nav>
      <div className='navLink'>
        {user ?
          <div>
            <span>
              <Link to={'/login'} onClick={onLogout}>
                <LogoutOutlined />
              </Link>
            </span>
            <span>
              <Link to={'/profile'} >
                <UserOutlined />
              </Link>
            </span>
            <span>
              <Link to={'/'} >
                <HomeOutlined />
              </Link>
            </span>
          </div>
          :
          <>
            <span>
              <Link to={'/login'}>
                <LoginOutlined />
              </Link>
            </span>
            <span>
              <Link to={'/register'}>
                <SolutionOutlined />
              </Link>
            </span>
            <span>
              <Link to={'/'} >
                <HomeOutlined />
              </Link>
            </span>
          </>
        }
      </div>
    </nav>
  )
}

export default Header