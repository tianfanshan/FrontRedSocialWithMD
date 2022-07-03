import { Input,Button,Form,notification } from 'antd';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addPost } from '../../../features/posts/postsSlice';



const AddPost = () => {

  const { postMessage,post } = useSelector((state)=>state.posts)

  console.log(post)

  const dispatch = useDispatch()

const onFinish = (value) => {
  console.log(value)
  dispatch(addPost(value))
  notification.success({
    message:postMessage
  })
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

  return (
    <div>
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
        label="Title"
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
        <br />
        <Form.Item
        label="Coment"
        name="body"
        rules={[
          {
            required: true,
            message: 'Escribe algo!!!',
          },
        ]}
      >
        <Input />
      </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Postear!
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddPost