import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { like, likesDown, getPostById, getAllPost, reset } from '../../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Card, Button, Modal, notification } from 'antd';
import PostDetail from "../../PostDetail/PostDetail"
import { getAllComments, resetComments } from "../../../features/comments/commentsSlice"
import '../Post/Post.scss'
import { follow, followOut, resetFollow1 } from "../../../features/auth/authSlice"
import { useEffect } from "react"


const { Meta } = Card;


const Post = () => {

  const { posts } = useSelector((state) => state.posts)
  const { user, followOutMessage1, followMessage1, isNotFollowed1, isFollowed1 } = useSelector((state) => state.auth)

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (isNotFollowed1) {
      notification.success({
        message: followOutMessage1
      })
      dispatch(resetFollow1())
    }
    if (isFollowed1) {
      notification.success({
        message: followMessage1
      })
      dispatch(resetFollow1())
    }
  }, [followMessage1, followOutMessage1, isNotFollowed1, isFollowed1])

  const follows = async (_id) => {
    await dispatch(follow(_id))
    await dispatch(getAllPost())
    dispatch(reset())
  }

  const followOuts = async (_id) => {
    await dispatch(followOut(_id))
    await dispatch(getAllPost())
    dispatch(reset())
  }

  const showModal = (_id) => {
    dispatch(getPostById(_id))
    dispatch(getAllComments())
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
    const isAlreadyFollowed = pos.userId?.followers?.includes(user?.user._id)

    console.log(pos)

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
              <Meta title={pos.userName} description={
                <div>
                  <span>{pos.body}</span><br />
                  <span>Posteador: {pos.userId.name}</span>
                </div>
              } />
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
              {isAlreadyFollowed ? (
                <UserDeleteOutlined onClick={() => followOuts(pos.userId._id)} />
              ) : (
                <UserAddOutlined onClick={() => follows(pos.userId._id)} />
              )}
            </>
            :
            <HeartFilled />
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