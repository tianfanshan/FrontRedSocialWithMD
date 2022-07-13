import React, { useEffect } from 'react'
import Post from './Post/Post'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { getAllPost, reset } from '../../features/posts/postsSlice'
import AddPost from './AddPost/AddPost'
import './Posts.scss'

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
    return <h1>Loading post...</h1>
  }

  return (
    <>
      {user ?
        <>
          <Post />
          <AddPost />
        </>
        :
        <Post/>}
    </>
  )
}

export default Posts