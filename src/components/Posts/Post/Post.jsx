import { useDispatch, useSelector } from "react-redux"
import { like } from '../../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Card } from 'antd';
const { Meta } = Card;

const Post = () => {
  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const post = posts.map(pos => {
    const isAlreadyLiked = pos.likes?.includes(user?.user._id)
    return (
      <div key={pos._id}>
        <p>{pos.body}</p>
        <span className="wish">Wish list: {pos.likes?.length}</span>
        {isAlreadyLiked ? (
          <HeartFilled onClick={() => console.log("dislike")} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(pos._id))} />
        )}
      </div>
    )
  })
  return (
    <div>
       <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src={post.images} />}
  >
    <Meta title={post.userName} description={post.body} />
  </Card>
      
    </div>
  )
}

export default Post