import { Input, Button, Form, notification, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../features/posts/postsSlice';


const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const AddPost = () => {

  const [form] = Form.useForm()

  const { addPostIsSuccess, addPostMessage } = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  const onFinish = (value) => {
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
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
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