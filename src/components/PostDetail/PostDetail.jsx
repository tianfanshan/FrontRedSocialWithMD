import { useEffect } from "react"
import { useSelector } from "react-redux/es/exports"
import AddComment from "./AddComment/AddComment"
import { createComment } from "../../features/comments/commentsSlice"

const PostDetail = () => {

    const { post } = useSelector((state) => state.posts)
    const { comment } = useSelector((state)=>state.comments)
    // console.log(comment)

    let comments = post.commentIds
    // console.log(comments)

    let newArray = [...comments,comment]

    console.log('new array',newArray)

    const detail = newArray?.map((det,i) => {
        return (
            <div key={i}>
                <h3>Comment: {det.comment}</h3>
            </div>
        )
    })

    return (
        <div>
            {detail}
            <AddComment />
        </div>
    )
}

export default PostDetail