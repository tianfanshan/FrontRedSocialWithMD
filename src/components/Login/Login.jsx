import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { Button, Form, Input, notification } from 'antd';
import { useEffect } from 'react';

const Login = () => {

    const { message, isError, isSuccess } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            notification.error({
                message: 'Error',
                description: message
            })
        }
        if (isSuccess) {
            notification.success({
                message: 'Success',
                description: message
            })
            setTimeout(() => {
                navigate('/profile')
            }, 3000)
        }
        dispatch(reset())
    }, [isError, isSuccess, message])

    const onFinish = (value) => {
        dispatch(login(value))
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
}

export default Login