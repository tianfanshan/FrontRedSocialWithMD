import React, { useState } from 'react'
import Posts from '../Posts/Posts'
import { like, likesDown, getPostById, getPostByText } from '../../features/posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Modal, Input } from 'antd';
import PostDetail from '../PostDetail/PostDetail';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { resetComments } from '../../features/comments/commentsSlice';
const { Meta } = Card;

const Home = () => {

  const { posts } = useSelector((state) => state.posts)

  const { user } = useSelector((state) => state.auth)

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()



  const post = posts.map((pos) => {
    const img = pos.images.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
    const isAlreadyLiked = pos.likes?.includes(user?.user._id)
    return (
      <div key={pos._id}>
        {pos.images.length > 0 ?
          <div>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={img}
            >
              <Meta title={pos.userName} description={pos.body} />
            </Card>
            <>
              <Button type="primary" onClick={() => showModal(pos._id)}>
                Comentarios
              </Button>
            </>
            <span className="wish">Likes: {pos.likes?.length}</span>
            {isAlreadyLiked ? (
              <HeartFilled onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
            ) : (
              <HeartOutlined onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
            )}
          </div>
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
            <>
              <Button type="primary" onClick={() => showModal(pos._id)}>
                Comentarios
              </Button>
            </>
            <span className="wish">Likes: {pos.likes?.length}</span>
            {isAlreadyLiked ? (
              <HeartFilled onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
            ) : (
              <HeartOutlined onClick={isAlreadyLiked ? () => dispatch(likesDown(pos._id)) : () => dispatch(like(pos._id))} />
            )}
          </div>
        }
      </div>
    )
  })

  const { Search } = Input;

  const onSearch = (value) => {
    dispatch(getPostByText(value))
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <h1>Home</h1>
      {!post ?
        <div>
          {post}
        </div>
        :
        <Posts />
      }
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <PostDetail />
      </Modal>
    </div>
  )
}

export default Home