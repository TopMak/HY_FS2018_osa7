import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  // console.log(response);
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

const submitUpdateToBlog = async (updatedBlogID) => {

  // const setHeaders = {
  //   headers: {'Authorization': token }
  // }

  //Allow likes to all viewers?
  const response = await axios.put(`${baseUrl}/${updatedBlogID}`)
  return response.data
}

const deleteBlogByID = async (deleteBlogID) => {

  const setHeaders = {
    headers: {'Authorization': token }
  }

  //Allow likes to all viewers?
  const response = await axios.delete(`${baseUrl}/${deleteBlogID}`, setHeaders)
  return response
}

// Post a comment
const submitComment = async (commentBlogID, comment) => {

  // const setHeaders = {
  //   headers: {'Authorization': token }
  // }

  const response = await axios.post(`${baseUrl}/${commentBlogID}/comments`, {comment})
  return response
}


export default { getAll, setToken, submitNewBlog, submitUpdateToBlog, deleteBlogByID, submitComment }
