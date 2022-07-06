import { useEffect } from "react"
import { useSelector } from "react-redux/es/exports"
import { notification } from 'antd';
import AddComment from "./AddComment/AddComment"

const PostDetail = () => {

    const { post } = useSelector((state) => state.posts)

    const { commentIsError, commentIsSuccess, createCommentMessage, comments } = useSelector((state) => state.comments)

    let commentss = post?.commentIds

    useEffect(() => {
        if (commentIsSuccess) {
            notification.success({
                description: createCommentMessage
            })
        }
        if (commentIsError) {
            notification.error({
                message: 'Error',
                description: createCommentMessage
            })
        }
    }, [commentIsError, commentIsSuccess, createCommentMessage])

    const detail = commentss?.map(det => {
        return (
            <div key={det._id}>
                <h3>Comment: {det.comment}</h3>
            </div>
        )
    })

    const com = comments?.map((c)=>{
        return(
            <div key={c._id}>
                <h3>Comment: {c.comment}</h3>
            </div>
        )
    })

    return (
        <div>
            {detail}
            {com}
            <AddComment />
        </div>
    )
}

export default PostDetail