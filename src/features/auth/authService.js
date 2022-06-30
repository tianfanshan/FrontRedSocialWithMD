import axios from 'axios'

const API_URL = 'http://localhost:8000'

const register = async (userData) => {
    console.log(userData)
    const res = await axios.post(API_URL + '/users', userData);
    console.log(res.data)
    return res.data
}

const authService = {
    register,
}

export default authService