import React,{useEffect} from 'react'
import Post from './Post/Post'
import { useDispatch,useSelector } from 'react-redux/es/exports'
import { getAllPost } from '../../features/posts/postsSlice'


const Posts = () => {
  const dispatch = useDispatch()
  
  const getPostAndReset = async () => {
    await dispatch(getAllPost())
  }

  useEffect(()=>{
    getPostAndReset()
  },[])

  return (
    <div>
      <h1>Posts</h1> 
      <Post/>
    </div>
  )
}

export default Posts