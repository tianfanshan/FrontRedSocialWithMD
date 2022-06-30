import { useDispatch, useSelector } from "react-redux"

const Post = () => {
  const { posts } = useSelector((state) => state.posts)
  console.log(posts)
  // const dispatch = useDispatch()

  const post = posts.map(pos => {
    console.log(pos)
    return (
      <div key={pos._id}>
        <p>{pos.body}</p>
      </div>
    )
  })
  return (
    <div>
      {post}
    </div>
  )
}

export default Post