import { useSelector } from "react-redux/es/exports"
import AddComment from "./AddComment/AddComment"

const PostDetail = () => {

    const { post } = useSelector((state) => state.posts)

    let comments = post.commentIds

    const detail = comments?.map((det,i) => {
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