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
import { getCurrentUser } from '../../features/auth/authSlice';
const { Meta } = Card;

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTwo, setIsModalVisibleTwo] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser())
    getPostAndReset()
  }, [])

  const getPostAndReset = async () => {
    await dispatch(getAllPost())
    dispatch(reset())
  }

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

  const post = currentUser?.postIds

  const postss = post?.map(pos => {
    const img = pos.images.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
    const isAlreadyLiked = pos.likes?.includes(currentUser?._id)
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

  const follow = currentUser?.followers

  const followers = follow?.map((f) => {
    return (
      <div key={f._id}>
        <span>Es {f.name}!...pero si solo es un {f.role} corriente..</span>
      </div>
    )
  })

  const following = currentUser?.followings

  const followings = following?.map((f) => {
    return (
      <div key={f._id}>
        <span>La persona que buscas se llama {f.name}...y no te gusta ∑( 口 ||</span>
      </div>
    )
  })

  const favorite = currentUser?.favorites

  const favorites = favorite?.map((pos) => {
    const img = pos.images.map((im, i) => {
      return (
        <img alt="post-img" src={"http://localhost:8080/posts-images/" + im} key={i} />
      )
    })
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
          <HeartFilled />
        </div>
      </div>
    )
  })

  return (
    <div>
      <div>
        {currentUser?.image ?
          <Image
            width={200}
            src={"http://localhost:8080/users-images/" + currentUser.image}
          />
          :
          null}
        <Divider orientation="left" plain>
          👮‍ Cuantos Años tienes 📋
        </Divider>
        <span>Tengo {currentUser?.age} años,me han hecho 40 cumpleaños en el Bootcamp...👨‍🦳</span><br />
        <Divider orientation="left" plain>
          Las movidas que has hecho (⌐■_■)
        </Divider>
        {currentUser?.commentId?.length < 1 ?
        <span>Necesitas un poco de contacto social (•_•)</span>
        :
        <div><span>Has hecho {currentUser?.commentId?.length} de comentarios</span><br /></div>
        }
        <Divider orientation="left" plain>
          Y les han gustado tus comentarios❗❓...O no...
        </Divider>
        <span>Tus {currentUser?.commentsLikes?.length} post les han gustado la gente ヾ(•ω•`)o </span><br />
        {currentUser?.followers?.length < 1 ?
          <div>
            <Divider orientation="left" plain>
              Nadie te quiere.../(ㄒoㄒ)/~~
            </Divider>
            <span>No es nada dificil postear tu foto en nuestra pagina 😍</span><br />
          </div>
          :
          <div>
            <Divider orientation="left" plain>
              ┗|｀O′|┛ Alquien te esta persiguiendo ε=ε=ε=(~￣▽￣)~
            </Divider>
            <span>{followers}</span><br />
          </div>
        }
        {currentUser?.followings?.length < 1 ?
          <div>
            <Divider orientation="left" plain>
              Muy chulo crack,quiere estar solo toda la vida ヾ(≧ ▽ ≦)ゝ
            </Divider>
            <span>Tienes que ser mas iniciativa!</span><br />
          </div>
          :
          <div>
            <Divider orientation="left" plain>
              El boton esta fallando, no puede dar follower al usuario (╯▔皿▔)╯
            </Divider>
            <span>{followings}</span><br />
          </div>
        }
        <Divider orientation="left" plain>
          👮‍ Enseñame tu 💳
        </Divider>
        <span>Mi nombre es: {currentUser?.name} (╯°□°）╯︵ ┻━┻</span><br />
        <Divider orientation="left" plain>
          👮‍ Quieres una cafe,venir con nosotros 🚓
        </Divider>
        <span>Soy {currentUser?.role}, tengo derecho a guardar silencio (◎﹏◎)</span><br />
        <Divider orientation="left" plain>
          Los posts que te has gustado...no me lo puedo creer (⊙_⊙)？
        </Divider>
        <span>{favorites}</span><br />
        <Divider orientation="left" plain>
          👮‍ Mira que has poseado,esta noche va ser larga...🌙
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