import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { Button, Checkbox, Form, Input, notification } from 'antd';

const Login = () => {

    const { user, message,token } = useSelector((state) => state.auth)
    console.log(message)
    console.log(user)

    const navigate = useNavigate()

    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: ''
    // })

    const dispatch = useDispatch()

    // const { email, password } = formData
    // const onChange = (e) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    const onFinish = (value) => {
        dispatch(login(value))
        notification.success({
            message: message,
            description: 'Happy hacking!'
        })
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

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
                label="email"
                name='email' 
                // value={email} 
                // onChange={onChange}
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
                label="Password"
                name='password' 
                // value={password} 
                // onChange={onChange}
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
    // <form onSubmit={onSubmit}>
    //     <input type="email" name='email' value={email} onChange={onChange} />
    //     <input type="password" name='password' value={password} onChange={onChange} />
    //     <button type='submit'>Login</button>
    // </form>
}

export default Login