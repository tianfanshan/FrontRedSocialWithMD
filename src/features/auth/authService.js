import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users", userData);
  return res.data;
};

const login = async (user) => {
  const res = await axios.post(API_URL + "/users/login", user);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/users/logout", {},{
    headers: {
      authorization: user.token,
    },
  });
  if (res.data) {
    localStorage.removeItem("user");
  }
  return res.data
};

const follow = async (_id) =>{
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.put(API_URL + "/users/followerId/" + _id,{},{
    headers:{
      authorization:user.token
    }
  })
  return res.data
}

const followOut = async (_id) =>{
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.put(API_URL + "/users/followeroutId/" +_id,{},{
    headers:{
      authorization:user.token
    }
  })
  return res.data
}

const getCurrentUser = async ()=>{
  
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await axios.get(API_URL + "/users/currentUser",{
    headers:{
      authorization:user.token
    }
  })
  return res.data
}

const authService = {
  register,
  login,
  logout,
  follow,
  followOut,
  getCurrentUser
};

export default authService;
