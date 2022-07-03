import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)


  return (
    <div>Perfil</div>
  )
}

export default Profile