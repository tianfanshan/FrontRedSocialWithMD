import axios from "axios";

const API_URL = "http://localhost:8080";

const createComment = async (comment) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(API_URL + "/comments/", comment, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const likeComment = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/comments/likeById/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const commentLikeDown = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/comments/likeDownById/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const getAllComments = async () => {
    const res = await axios.get(API_URL + "/comments/getAllComments")
    return res.data
}

const EditComment = async (comment) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.put(API_URL + "/comments/id/" + comment._id  ,comment,{
    headers:{
      authorization:user?.token
    }
  })
  return res.data
}

const getCommentById = async (_id) => {
  const res = await axios.get(API_URL + "/comments/getCommentById/" + _id)
  return res.data
}

const commentsService = {
  createComment,
  likeComment,
  commentLikeDown,
  getAllComments,
  EditComment,
  getCommentById
};

export default commentsService;
