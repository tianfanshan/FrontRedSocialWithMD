import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { like, likesDown, getPostById } from '../../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Card, Button, Modal } from 'antd';
import PostDetail from "../../PostDetail/PostDetail"
import { resetComments } from "../../../features/comments/commentsSlice"
import '../Post/Post.scss'
import { follow, followOut } from "../../../features/auth/authSlice"


const { Meta } = Card;


const Post = () => {

  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  console.log(user)

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()

  const showModal = (_id) => {
    dispatch(getPostById(_id))
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(resetComments())
  };

  const postss = posts.map(pos => {
    const img = pos.images.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
    if (typeof (user?.user._id) == Object) {
      return user?.user._id.toString()
    }
    const isAlreadyLiked = pos.likes?.includes(user?.user._id)
    return (
      <div key={pos._id}>
        <div>
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
            <Card
              hoverable
              style={{
                width: 240,
              }}
            >
              <Meta title={pos.userName} description={pos.body} />
            </Card>
          }
          <>
            <Button type="primary" onClick={() => showModal(pos._id)}>
              Comentarios
            </Button>
          </>
          <span className="wish">Likes: {pos.likes?.length}</span>
          {user ?
            <>
              {isAlreadyLiked ? (
                <HeartFilled onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
              ) : (
                <HeartOutlined onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
              )}
            </>
            :
            <HeartFilled />
          }
          {user ?
            <div>
              <UserAddOutlined onClick={() => dispatch(follow(pos.userId))} />
              <UserDeleteOutlined onClick={() => dispatch(followOut(pos.userId))} />
            </div>
            :
            null
          }

        </div>
      </div>
    )
  })

  return (
    <div className="postContainer">
      {postss}
      <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
        <PostDetail />
      </Modal>
    </div>
  )
}

export default Post