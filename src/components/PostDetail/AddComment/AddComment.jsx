import { Input, Button, Form, notification } from 'antd';
import { createComment } from '../../../features/comments/commentsSlice'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useEffect } from 'react';
import { getCurrentUser } from '../../../features/auth/authSlice';

const AddComment = () => {

  const { commentIsError, commentIsSuccess, createCommentMessage } = useSelector((state) => state.comments)

  useEffect(() => {
    if (commentIsSuccess) {
      notification.success({
        description: createCommentMessage
      })
    }
    if (commentIsError) {
      notification.error({
        message: 'Error',
        description: createCommentMessage
      })
    }
  }, [commentIsError, commentIsSuccess, createCommentMessage])

  const { post } = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const onFinish = async(comment) => {
    let postId = post._id
    let newObj = { postId, ...comment }
    await dispatch(createComment(newObj))
    dispatch(getCurrentUser())
    form.resetFields()
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
        form={form}
      >
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: 'write something',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

export default AddComment