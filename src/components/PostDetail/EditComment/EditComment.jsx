import { useSelector, useDispatch } from "react-redux/es/exports"
import { Button, Modal, Form, Input } from "antd"
import { useEffect } from "react"
import { EditComment, getAllComments } from "../../../features/comments/commentsSlice"

const EditModal = ({ visible, setVisible, onCancel }) => {

  const dispatch = useDispatch()
  const { comment } = useSelector((state) => state.comments)

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(comment)
  }, [comment])

  const onFinish = async (values) => {
    const commentWithId = { ...values, _id: comment?._id }
    await dispatch(EditComment(commentWithId))
    dispatch(getAllComments())
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
        <Form.Item label='Post Title' name='comment'>
          <Input placeholder="Post title" />
        </Form.Item>
        <Button type="primary" htmlType='submit'>
          Edit your comment
        </Button>
      </Form>
    </Modal>
  )
}

export default EditModal