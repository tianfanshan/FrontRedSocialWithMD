import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPostById } from '../../features/posts/postsSlice'

import { like, likesDown } from '../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Card, Button, Modal, Image } from 'antd';
import PostDetail from "../PostDetail/PostDetail"
import { resetComments } from '../../features/comments/commentsSlice'
const { Meta } = Card;

const Profile = () => {

  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)


  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (_id) => {
    dispatch(getPostById(_id))
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(resetComments())
  };

  const info = user?.user

  const dispatch = useDispatch()

  const userPost = info.postIds

  useEffect(() => {
    userPost.map((p) => {
      dispatch(getPostById(p))
    })
  }, [])

  const postss = posts.map(pos => {
    const img = pos.images.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
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
            <>
              {isAlreadyLiked ? (
                <HeartFilled onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
              ) : (
                <HeartOutlined onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
              )}
            </>
        </div>
      </div>
    )
  })



  return (
    <div>
      <div>
        {user.user.image ?
          <Image
            width={200}
            src={"http://localhost:8080/users-images/" + user.user.image}
          /> : null}
        <span>Años: {info.age}</span><br />
        <span>Cantidad de comentarios: {info.commentId.length}</span><br />
        <span>Likes de comentarios: {info.commentsLikes.length}</span><br />
        <span>Favoritos: {info.favorites.length}</span><br />
        <span>Followers: {info.followers.length}</span><br />
        <span>Followings: {info.followings.length}</span><br />
        <span>Name: {info.name}</span><br />
        <span>Role: {info.role}</span><br />
        {postss}
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <PostDetail />
        </Modal>
      </div>
    </div>
  )
}

export default Profile