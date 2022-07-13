import { useDispatch, useSelector } from 'react-redux'
import { login, resetLogin } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import { Button, Form, Input, notification } from 'antd';
import './Login.scss'

const Login = () => {

    const { loginMessage, isLoginError, isLoginSuccess } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const onFinish = (value) => {
        dispatch(login(value))
        if (isLoginError) {
            notification.error({
                message: 'Error',
                description: loginMessage
            })
            dispatch(resetLogin())
        }
        if (isLoginSuccess) {
            notification.success({
                message: 'Success',
                description: loginMessage
            })
            dispatch(resetLogin())
            setTimeout(() => {
                navigate('/profile')
            }, 1000)
        }
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
            className='loginForm'
        >
            <div className='inputForm'>
                <Form.Item
                    label="Email"
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    className='formItem'
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
                    className='formItem'
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" className='button'>
                        Logeate
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}

export default Login