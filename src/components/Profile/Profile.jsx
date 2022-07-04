import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getPostById } from '../../features/posts/postsSlice'

const Profile = () => {

  const { post } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  const info = user?.user

  let newArray = []

  newArray.push(post)

  console.log(newArray)

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
      <span>{post.body}</span>
    </div>
  )
}

export default Profile