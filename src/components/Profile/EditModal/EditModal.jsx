import { useSelector } from "react-redux/es/exports"
import { Button, Modal, Form, InputNumber, Select, Input } from "antd/lib/radio"

const EditModal = ({visible,setVisible}) => {

  // const { Option } = Select;
  const { post } = useSelector((state)=>state.posts)
  console.log(post)

  const onFinish = (values)=>{
    console.log(values)
    setVisible(false)
  }

  return (
    <h1>Holi</h1>
    // <Modal
    // title="Edit Post"
    // visible={visible}
    // footer={[]}
    // >
    //   <Form onFinish={onFinish}>
    //     <Form.Item label="Post Name" name="name">
    //       <input placeholder="Post name" />
    //     </Form.Item>
    //     <Form.Item>

    //     </Form.Item>
    //   </Form>
    // </Modal>
  )
}

export default EditModal