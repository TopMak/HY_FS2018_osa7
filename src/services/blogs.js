import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log("current user token: ", token);
}

const submitNewBlog = async (newBlogData) => {

  const setHeaders = {
    headers: {'Authorization': token }
  }

  const response = await axios.post(baseUrl, newBlogData, setHeaders)
  return response.data
}


export default { getAll, setToken, submitNewBlog }
