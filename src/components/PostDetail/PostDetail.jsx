import { useDispatch, useSelector } from "react-redux/es/exports"
import AddComment from "./AddComment/AddComment"
import { HeartOutlined, HeartFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { commentLikeDown, getAllComments, likeComment } from "../../features/comments/commentsSlice"


const PostDetail = () => {

    const { post } = useSelector((state) => state.posts)
    const { comments } = useSelector((state) => state.comments)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()


    const commentOfPost = comments.filter((c) => c.postId == post._id)

    const comment = commentOfPost.map(det=>{
        const isAlreadyLiked = det.likes?.includes(user?.user._id)
            return (
                <div key={det._id}>
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
                    {user?.user.commentId.includes(det._id) ?
                        <div>
                            {/* <EditOutlined onClick={() => showModalEditPost(det._id)} /> */}
                            <DeleteOutlined />
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