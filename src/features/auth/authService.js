import axios from "axios";

const API_URL = "http://localhost:8000";

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

//-------------axios request errror about token-----------

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.token)
  const res = await axios.put(API_URL + "/users/logout", {
    headers: {
      authorization: user.token,
    },
  });
  console.log('hoilaaaaa',res)
  if (res.data) {
    localStorage.removeItem("user");
  }
  return res.data
};

//-------------------------------------------------------

const authService = {
  register,
  login,
  logout,
};

export default authService;
