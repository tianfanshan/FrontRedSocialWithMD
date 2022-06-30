import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authSlice'

const Login = () => {
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