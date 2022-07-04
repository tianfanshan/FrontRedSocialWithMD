import axios from "axios"

const API_URL = "http://localhost:8080";

const createComment = async (comment)=>{
    const user = JSON.parse(localStorage.getItem("user"))
    const res = await axios.post(API_URL + "/comments/",comment,{
        headers:{
            authorization:user?.token
        }
    })
    return res.data
}

const commentsService = {
    createComment
}

export default commentsService