import { useDispatch, useSelector } from "react-redux/es/exports"
import AddComment from "./AddComment/AddComment"
import { HeartOutlined, HeartFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { commentLikeDown, deleteCommentById, getAllComments, getCommentById, likeComment } from "../../features/comments/commentsSlice"
import { useState } from "react"
import EditModal from './EditComment/EditComment'
import { notification } from "antd"
import './PostDetail.scss'

const PostDetail = () => {

  const { post } = useSelector((state) => state.posts)
  const { comments, deleteCommentMessage } = useSelector((state) => state.comments)
  const { user } = useSelector((state) => state.auth)

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()

  const showModalEditComment = (_id) => {
    dispatch(getCommentById(_id))
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  };

  const deleteComment = async (_id) =>{
    await dispatch(deleteCommentById(_id))
    notification.success({
      message:deleteCommentMessage
    })
    dispatch(getAllComments())
  }

  const commentOfPost = comments?.filter((c) => c.postId == post._id)

  const comment = commentOfPost?.map(det => {
    const isAlreadyLiked = det.likes?.includes(user?.user._id)
    return (
      <div key={det._id}>
        <h2>User: {user?.user.name}</h2>
        <h3>Comment: {det.comment}</h3>

        <span className="wish">Likes: {det.likes?.length}</span>
        {user ?
          <>
            {isAlreadyLiked ? (
              <HeartFilled onClick={isAlreadyLiked ? () => dispatch(commentLikeDown(det._id)) : () => dispatch(likeComment(det._id))} />
            ) : (
              <HeartOutlined onClick={isAlreadyLiked ? () => dispatch(commentLikeDown(det._id)) : () => dispatch(likeComment(det._id))} />
            )}
          </>
          :
          <HeartFilled />
        }
        {user?.user._id === (det.userId) ?
          <div>
            <EditOutlined onClick={() => showModalEditComment(det._id)} />
            <EditModal visible={isModalVisible} setVisible={setIsModalVisible} onCancel={handleCancel} />
            <DeleteOutlined onClick={() => deleteComment(det._id)} />
          </div>
          :
          null}
      </div>
    )
  })

  return (
    <div>
      {comment}
      <AddComment />
    </div>
  )
}

export default PostDetail