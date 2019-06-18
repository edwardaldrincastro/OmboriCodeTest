const axios = require('axios');

export const getAllUsers = async (page, per_page, delay) => {
  try { 
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}&delay=${delay}` )
    return response.data
  } catch (error) {
    console.log('err',error)
  }
}