import { useSelector, useDispatch } from "react-redux/es/exports"
import { Button, Modal, Form, InputNumber, Select, Input } from "antd"
import { useEffect } from "react"
import { updatePost } from "../../../features/posts/postsSlice"

const EditModal = ({visible,setVisible,onCancel}) => {

  const dispatch = useDispatch()
  const { post } = useSelector((state)=>state.posts)

  const [form] = Form.useForm()

  useEffect(()=>{
    form.setFieldsValue(post)
  },[post])

  const onFinish = (values)=>{
    const postWithId = {...values,_id:post._id}
    dispatch(updatePost(postWithId))
    setVisible(false)
  }

  return (
    <Modal
    title='Edit post'
    visible={visible}
    footer={[]}
    onCancel={onCancel}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item label='Post Title' name='userName'>
          <Input placeholder="Post title"/>
        </Form.Item>
        <Form.Item label={'post name'} name='body'>
          <Input placeholder="Post body"/>
        </Form.Item>
        <Button type="primary" htmlType='submit'>
          Ejecuta movida!!!
        </Button>
      </Form>
    </Modal>
  )
}

export default EditModal