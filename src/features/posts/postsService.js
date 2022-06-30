import axios from 'axios'

const API_URL = "http://localhost:8000"

const getAllPost = async () => {
    const res = await axios.get(API_URL + '/posts')
    console.log(res)
}

const postsService = {
    getAllPost
}

export default postsService