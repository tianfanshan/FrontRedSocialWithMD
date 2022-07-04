import axios from "axios";

const API_URL = "http://localhost:8080";

const getAllPost = async () => {
  const res = await axios.get(API_URL + "/posts");
  return res.data;
};

const like = async (_id) => {
  console.log(_id);
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/posts/likesUp/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  console.log("res like", res);
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
  console.log(text)
  const res = await axios.get(API_URL + "/posts/body/" + text)
  console.log(res)
  return res.data
}

const postsService = {
  getAllPost,
  like,
  likesDown,
  addPost,
  getPostById,
  getPostByText
};

export default postsService;
