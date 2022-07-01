import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../features/auth/authSlice'
import { notification } from 'antd'
import { useNavigate } from 'react-router'


const Register = () => {

  const navigate = useNavigate()

  const { user, message } = useSelector((state) => state.auth)
  console.log(user)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    age: ''
  })
  const { name, email, password, password2, age } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      return notification.error({
        message: 'Error',
        description: 'Passwords do not match'
      })
    } else {
      dispatch(register(formData))
      notification.success({
        message: message,
        description: 'Happy hacking!'
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name='name' value={name} onChange={onChange} />
      <input type="email" name='email' value={email} onChange={onChange} />
      <input type="number" name='age' value={age} onChange={onChange} />
      <input type="password" name='password' value={password} onChange={onChange} />
      <input type="password" name='password2' value={password2} onChange={onChange} />
      <button type='submit'>Register</button>
    </form>
  )
}

export default Register