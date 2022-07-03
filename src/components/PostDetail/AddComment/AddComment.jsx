import React from 'react'
import { Input, Button, Form, notification } from 'antd';
import { createComment } from '../../../features/comments/commentsSlice'
import { useSelector, useDispatch } from 'react-redux/es/exports'

const AddComment = () => {

  const { post } = useSelector((state) => state.posts)
  const { comment } = useSelector((state) => state.comments)

  console.log(comment)

  const dispatch = useDispatch()

  const onFinish = (comment) => {
    console.log(comment)
    dispatch(createComment(comment))
    // notification.success({
    //   message: commentMessage
    // })
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
        label="Comentar!"
        name="comment"
        rules={[
          {
            required: true,
            message: 'Escribe coment!!!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Commentar!!!
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddComment