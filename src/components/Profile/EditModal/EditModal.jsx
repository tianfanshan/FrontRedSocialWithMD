import { useSelector, useDispatch } from "react-redux/es/exports"
import { Button, Modal, Form, InputNumber, Select, Input } from "antd"
import { useEffect } from "react"
import { updatePost } from "../../../features/posts/postsSlice"

const EditModal = ({visible,setVisible}) => {

  const dispatch = useDispatch()
  // const { Option } = Select;
  const { post } = useSelector((state)=>state.posts)
  console.log(post)

  const [form] = Form.useForm()

  useEffect(()=>{
    form.setFiledsValue()
  },[])



  const onFinish = (values)=>{
    const postWithId = {...values,_id:post._id}
    dispatch(updatePost(postWithId))
    setVisible(false)
  }

  return (
    <Modal
    title="Edit Post"
    visible={visible}
    footer={[]}
    >
      <Form onFinish={onFinish}>
        <Form.Item label="Post title" name="title">
          <input placeholder="Post title" />
        </Form.Item>
        <Form.Item label="Post userName" name="userName">
          <input placeholder="Post body" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Click para ejecutar movida!
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal