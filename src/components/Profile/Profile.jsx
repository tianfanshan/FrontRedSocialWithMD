import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getPostById } from '../../features/posts/postsSlice'

import { like, likesDown } from '../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Card, Button, Modal } from 'antd';
import PostDetail from "../PostDetail/PostDetail"
const { Meta } = Card;

const Profile = () => {

  const { post,posts,getPostMessage } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  console.log(getPostMessage)

  console.log(posts)

  
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
  };

  const po = posts.map((p)=>{
    const img = p.images?.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
    const isAlreadyLiked = p.likes?.includes(user?.user._id)
    return (
      <div key={p._id}>
        {p.images.length > 0 ?
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={img}
          >
            <Meta title={p.userName} description={p.body} />
          </Card>
          :
          <div>
            <Card
              hoverable
              style={{
                width: 240,
              }}
            >
              <Meta title={p.userName} description={p.body} />
            </Card>
            <span className="wish">Wish list: {p.likes?.length}</span>
            <>
              <Button type="primary" onClick={() => showModal(p._id)}>
                Open Modal
              </Button>
              <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <PostDetail />
              </Modal>
            </>
            {isAlreadyLiked ? (
              <HeartFilled onClick={() => dispatch(likesDown(p._id))} />
            ) : (
              <HeartOutlined onClick={() => dispatch(like(p._id))} />
            )}
          </div>
        }
      </div>
    )
  })

  const info = user?.user

  const dispatch = useDispatch()

  const userPost = info.postIds

  useEffect(()=>{
    userPost.map((p)=>{
      dispatch(getPostById(p))
    })
  },[])

  return (
    <div>
      <span>Años: {info.age}</span><br />
      <span>Cantidad de comentarios: {info.commentId.length}</span><br />
      <span>Likes de comentarios: {info.commentsLikes.length}</span><br />
      <span>Favoritos: {info.favorites.length}</span><br />
      <span>Followers: {info.followers.length}</span><br />
      <span>Followings: {info.followings.length}</span><br />
      <span>Correo: {info.name}</span><br />
      <span>Role: {info.role}</span><br />
      <span>post: {post.body}</span><br />
      {po}
    </div>
  )
}

export default Profile