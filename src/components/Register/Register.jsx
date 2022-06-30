import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { register } from '../../features/auth/authSlice'

const Register = () => {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
    const {name,email,password} = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
    }
    const onSubmit = (e) => {
      e.preventDefault()
      console.log('formData',formData)
      dispatch(register(formData))
    } 
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name='name' value={name} onChange={onChange}/>
      <input type="email" name='email' value={email} onChange={onChange}/>
      <input type="password" name='password' value={password} onChange={onChange}/>
      <button type='submit'>Register</button>
    </form>
  )
}

export default Register