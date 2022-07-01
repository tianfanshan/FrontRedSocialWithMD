import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { notification } from 'antd'
import { useNavigate } from 'react-router'

const Login = () => {

    const { user,message } = useSelector((state) => state.auth)
    console.log(message)
    console.log(user)

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        dispatch(login(formData))
        notification.success({
            message: message,
            description: 'Happy hacking!'
          })
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="email" name='email' value={email} onChange={onChange} />
            <input type="password" name='password' value={password} onChange={onChange} />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login