import { Input, Button, Form, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../features/posts/postsSlice';
import './AddPost.scss'

const AddPost = () => {


  const [form] = Form.useForm()

  const { addPostIsSuccess, addPostMessage } = useSelector((state) => state.posts)

  const dispatch = useDispatch()



  const onFinish = async (value) => {

    dispatch(addPost(value))
    if (addPostIsSuccess) {
      notification.success({
        message: addPostMessage
      })

    }
    form.resetFields()
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='addCard'>
      <div className='postInput'>
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
            label="Comment"
            name="body"
            rules={[
              {
                required: true,
                message: 'Escribe algo!!!',
              },
            ]}
          >
            <textarea/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default AddPost