import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  console.log(posts)
  console.log(user)

  return (
    <div>Perfil</div>
  )
}

export default Profile