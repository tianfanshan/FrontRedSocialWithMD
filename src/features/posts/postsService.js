import axios from 'axios'

const API_URL = "http://localhost:8000"

const getAllPost = async () => {
    const res = await axios.get(API_URL + '/posts')
    return res.data
}

const like = async (_id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await axios.put(API_URL + '/posts/likesUp/' + _id,{},{
        headers:{
            authorization:user?.token
        }
    })
}

// const likeDown = async (_id) => {
//     const user = JSON.parse(localStorage.getItem('user'))
//     const res = await axios.put(API_URL + '' + _id , {} , {
//         headers:{
//             authorization: user?.token
//         }
//     })
// }

const postsService = {
    getAllPost,
    like,
    // likeDown
}

export default postsService