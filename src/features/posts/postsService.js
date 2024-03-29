import axios from "axios";

const API_URL = "https://redsocial-backend.herokuapp.com";

const getAllPost = async () => {
  const res = await axios.get(API_URL + "/posts");
  return res.data;
};

const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/posts/likesUp/" + _id,{},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
    return res.data
};

const likesDown = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/posts/likesDown/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data
};

const addPost = async (post) =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const res = await axios.post(API_URL + "/posts",post,{
        headers:{
            authorization:user?.token
        }
    })
    return res.data
}

const getPostById = async (_id) => {
  const res = await axios.get(API_URL + "/posts/id/" + _id)
  return res.data
}

const getPostByText = async (text) => {
  const res = await axios.get(API_URL + "/posts/body/" + text)
  return res.data
}

const updatePost = async (post) =>{
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.put(API_URL + "/posts/id/" + post._id,post,{
    headers:{
      authorization:user?.token
    }
  })
  return res.data
}

const deletePost = async(_id) =>{
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.delete(API_URL + "/posts/id/" + _id,{
    headers:{
      authorization:user?.token
    }
  })
  return res.data
}

const postsService = {
  getAllPost,
  like,
  likesDown,
  addPost,
  getPostById,
  getPostByText,
  updatePost,
  deletePost
};

export default postsService;
