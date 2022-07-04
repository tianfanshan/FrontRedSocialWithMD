import { Input, Button, Form, notification } from 'antd';
import { createComment,createCommentReset } from '../../../features/comments/commentsSlice'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useEffect } from 'react';

const AddComment = () => {

  const { post } = useSelector((state) => state.posts)
  const { commentIsError, commentIsSuccess, createCommentMessage } = useSelector((state) => state.comments)

  const dispatch = useDispatch()

  useEffect(() => {
    if (commentIsSuccess) {
      notification.success({
        description: createCommentMessage
      })
      dispatch(createCommentReset())
    }
    if (commentIsError) {
      notification.error({
        message: 'Error',
        description: createCommentMessage
      })
      dispatch(createCommentReset())
    }
  }, [commentIsError, commentIsSuccess, createCommentMessage])

  const onFinish = (comment) => {
    let postId = post._id
    let newOjb = { postId, ...comment }
    dispatch(createComment(newOjb))
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
    </div>

  )
}

export default AddComment