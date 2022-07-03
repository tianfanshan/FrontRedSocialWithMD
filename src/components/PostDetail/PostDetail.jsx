import { useDispatch, useSelector } from "react-redux/es/exports"
import AddComment from "./AddComment/AddComment"

const PostDetail = () => {

    const { post } = useSelector((state) => state.posts)

    let comments = post.commentIds

    console.log(post)

    const detail = comments.map((det,i) => {
        return (
            <div key={i}>
                <h3>{det.comment}</h3>
                <AddComment />
            </div>
        )
    })

    return (
        <div>
            {detail}
        </div>
    )
}

export default PostDetail