import { useDispatch, useSelector } from "react-redux"
import { like, likesDown } from '../../../features/posts/postsSlice'
import 'antd/dist/antd.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Card } from 'antd';
const { Meta } = Card;

const Post = () => {
  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  console.log(posts)

  const dispatch = useDispatch()

  const postss = posts.map(pos => {
    const isAlreadyLiked = pos.likes?.includes(user?.user._id)
    return (
      <div key={pos._id}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={pos.images} />}
        >
          <Meta title={pos.userName} description={pos.body} />
        </Card>
        <span className="wish">Wish list: {pos.likes?.length}</span>
        {isAlreadyLiked ? (
            <HeartFilled onClick={() => dispatch(likesDown(pos._id))} />
          ) : (
            <HeartOutlined onClick={() => dispatch(like(pos._id))} />
          )}
      </div>
    )
  })
  return (
    <div>
      {postss}
    </div>
  )
}

export default Post