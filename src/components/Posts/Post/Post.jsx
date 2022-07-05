import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { like, likesDown, getPostById } from '../../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Card, Button, Modal } from 'antd';
import PostDetail from "../../PostDetail/PostDetail"
const { Meta } = Card;


const Post = () => {
  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()

  const showModal = (_id) => {
    dispatch(getPostById(_id))
    setIsModalVisible(true);
  };
  
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const postss = posts.map((pos, i) => {
    const img = pos.images.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
    const isAlreadyLiked = pos.likes?.includes(user?.user._id)
    return (
      <div key={i}>
        {pos.images.length > 0 ?
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={img}
          >
            <Meta title={pos.userName} description={pos.body} />
          </Card>
          :
          <div>
            <Card
              hoverable
              style={{
                width: 240,
              }}
            >
              <Meta title={pos.userName} description={pos.body} />
            </Card>
            <span className="wish">Wish list: {pos.likes?.length}</span>
            <>
              <Button type="primary" onClick={() => showModal(pos._id)}>
                Open Modal
              </Button>
              <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <PostDetail />
              </Modal>
            </>
            {isAlreadyLiked ? (
              <HeartFilled onClick={() => dispatch(likesDown(pos._id))} />
            ) : (
              <HeartOutlined onClick={() => dispatch(like(pos._id))} />
            )}
          </div>
        }
      </div>
    )
  })
  return (
    <div>
      {postss}
    </div>
  )
}

export default Post