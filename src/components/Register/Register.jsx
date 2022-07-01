import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { Button, Form, Input, notification, InputNumber } from 'antd';


const Register = () => {

  const navigate = useNavigate()

  const { user, message } = useSelector((state) => state.auth)
  console.log('user', user)
  console.log('message', message)

  const dispatch = useDispatch()

  const onFinish = (value) => {
    dispatch(register(value))
    notification.success({
      message: message,
      description: 'Happy hacking!'
    })
    setTimeout(() => {
      navigate('/login')
    }, 3000)
    // }
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
      >
        <Input />
      </Form.Item>

      <Form.Item label="InputNumber"
        name='age'
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
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
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
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
  )
}

export default Register