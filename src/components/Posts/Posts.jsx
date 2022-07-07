import React, { useEffect } from 'react'
import Post from './Post/Post'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { getAllPost, isLoading, reset } from '../../features/posts/postsSlice'
import AddPost from './AddPost/AddPost'

const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()


  const getPostAndReset = async () => {
    await dispatch(getAllPost())
    dispatch(reset())
  }

  useEffect(() => {
    getPostAndReset()
  }, [])

  if (isLoading) {
    return <h1>Cargando posts...</h1>
  }

  return (
    <div>
      <h1>Posts</h1>
      {user ?
        <div>
          <Post />
          <AddPost />
        </div>
        :
        <Post />}
    </div>
  )
}

export default Posts