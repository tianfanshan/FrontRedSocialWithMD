import React,{useEffect} from 'react'
import Post from './Post/Post'
import { useDispatch,useSelector } from 'react-redux/es/exports'
import { getAllPost,isLoading, reset } from '../../features/posts/postsSlice'

const Posts = () => {
  const { isLoading } = useSelector((state)=>state.posts)
  const dispatch = useDispatch()
  
  const getPostAndReset = async () => {
    await dispatch(getAllPost())
    dispatch(reset())
  }

  useEffect(()=>{
    getPostAndReset()
  },[])

  if(isLoading){
    return <h1>Cargando posts...</h1>
  }

  return (
    <div>
      <h1>Posts</h1> 
      <Post/>
    </div>
  )
}

export default Posts