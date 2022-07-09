import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPost, getPostById, reset, deletePost } from '../../features/posts/postsSlice'
import './Profile.scss'
import { Divider } from 'antd';


import { like, likesDown } from '../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Button, Modal, Image } from 'antd';
import PostDetail from "../PostDetail/PostDetail"
import { resetComments } from '../../features/comments/commentsSlice'
import EditModal from './EditModal/EditModal'
const { Meta } = Card;

const Profile = () => {

  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false);

  const showModalEditPost = (_id) => {
    dispatch(getPostById(_id))
    setIsModalVisibleTwo(true)
  }

  const handleCancelTwo = () => {
    setIsModalVisibleTwo(false);
  };

  const showModal = (_id) => {
    dispatch(getPostById(_id))
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(resetComments())
  };

  const getPostAndReset = async () => {
    await dispatch(getAllPost())
    dispatch(reset())
  }

  useEffect(() => {
    getPostAndReset()
  }, [])

  const info = user?.user

  const po = posts.filter((p) => p.userId == info?._id)

  const postss = po.map(pos => {
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
            <EditOutlined onClick={() => showModalEditPost(pos._id)} />
            <DeleteOutlined onClick={() => dispatch(deletePost(pos._id))} />
          </>
        </div>
      </div>
    )
  })



  return (
    <div>
      <div>
        {user?.user.image ?
          <Image
            width={200}
            src={"http://localhost:8080/users-images/" + user.user.image}
          />
          :
          null}
        <Divider orientation="left" plain>
          Cuantos Años tienes!!!!!!🧓
        </Divider>
        <span>{info.age}</span><br />
        <Divider orientation="left" plain>
          Cuantas movidas has dejado en los posts😀
        </Divider>
        <span>{info.commentId.length}</span><br />
        <Divider orientation="left" plain>
          Y les gustan tus comentarios❗❓
        </Divider>
        <span>{info.commentsLikes.length}</span><br />
        <Divider orientation="left" plain>
          Los posts que te has gustado...no me lo puedo creer🤡
        </Divider>
        <span>{info.favorites.length}</span><br />
        {info.followers.length < 1 ?
          <div>
            <Divider orientation="left" plain>
              Nadie te quiere.../(ㄒoㄒ)/~~
            </Divider>
            <span>Mis followers {info.followers.length}!!!</span><br />
          </div>
          :
          <div>
            <Divider orientation="left" plain>
              ┗|｀O′|┛ Alquien te esta persiguiendo ε=ε=ε=(~￣▽￣)~
            </Divider>
            <span>{info.followers.length}</span><br />
          </div>
        }
        {info.followings.length < 1 ?
          <div>
            <Divider orientation="left" plain>
              Muy chulo crack,quiere estar solo toda la vida ヾ(≧ ▽ ≦)ゝ
            </Divider>
            <span>Quieres movida con {info.followings.length} usuarios</span><br />
          </div>
          :
          <div>
            <Divider orientation="left" plain>
              El boton esta fallando, no puede dar follower al usuario (╯▔皿▔)╯
            </Divider>
            <span>Estas persiguiendo a {info.followings.length} humanos, o no...</span><br />
          </div>
        }
        <Divider orientation="left" plain>
          Tu nombre es👇
        </Divider>
        <span>Es {info.name}!!!</span><br />
        <Divider orientation="left" plain>
          Quien eres👇
        </Divider>
        <span>Soy {info.role}!!!</span><br />
        <Divider orientation="left" plain>
          👇Posts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!👇
        </Divider>
        {postss}
        <EditModal visible={isModalVisibleTwo} setVisible={setIsModalVisibleTwo} onCancel={handleCancelTwo} />
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
          <PostDetail />
        </Modal>
      </div>
    </div>
  )
}

export default Profile