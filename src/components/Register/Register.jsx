import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { Button, Form, Input, notification,InputNumber } from 'antd';


const Register = () => {

  const navigate = useNavigate()

  const { user, message } = useSelector((state) => state.auth)
  console.log(user)
  console.log(message)
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
  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   if (password !== password2) {
  //     return notification.error({
  //       message: 'Error',
  //       description: 'Passwords do not match'
  //     })
  //   } else {
  //     dispatch(register(formData))
  //     console.log(formData)
  //     notification.success({
  //       message: message,
  //       description: 'Happy hacking!'
  //     })
  //     setTimeout(() => {
  //       navigate('/login')
  //     }, 3000)
  //   }
  // }

  const onFinish = () => {
    if (password !== password2) {
      return notification.error({
        message: 'Error',
        description: 'Passwords do not match'
      })
    } else {
      dispatch(register(formData))
      console.log(formData)
      notification.success({
        message: message,
        description: 'Happy hacking!'
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="name"
        value={name} 
        onChange={onChange}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
        value={email} 
        onChange={onChange}
      >
        <Input />
      </Form.Item>

      <Form.Item label="InputNumber" 
      name='age'
      value={age} 
      onChange={onChange}
      >
        <InputNumber />
        </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        value={password} 
        onChange={onChange}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password2"
        value={password2} 
        onChange={onChange}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // <form onSubmit={onSubmit}>
    //   <input type="text" name='name' value={name} onChange={onChange} />
    //   <input type="email" name='email' value={email} onChange={onChange} />
    //   <input type="number" name='age' value={age} onChange={onChange} />
    //   <input type="password" name='password' value={password} onChange={onChange} />
    //   <input type="password" name='password2' value={password2} onChange={onChange} />
    //   <button type='submit'>Register</button>
    // </form>
  )
}

export default Register