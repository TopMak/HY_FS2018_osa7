
import blogService from '../services/blogs'

import { notifyWithTimeout } from './notificationReducer'

// empty array as initState
const initState = []

const blogReducer = (state=initState, action) => {

  switch(action.type) {
  case 'INIT_BLOGS':{
    const sortedBlogs = action.blogs.concat().sort( (a,b) => b.likes - a.likes);
    return sortedBlogs
  }

  case 'ADD_BLOG':{
    const addedBlogs = state.concat(action.newBlog)
    return addedBlogs
  }

  case 'SORT_BY_LIKES':{
    const sortedBlogs = state.concat().sort( (a,b) => b.likes - a.likes);
    return sortedBlogs
  }

  case 'UPDATE_BLOG':{
    const updatedBlogs = state.map( blog => blog.id === action.updatedBlog.id ? action.updatedBlog : blog)
    return updatedBlogs
  }

  case 'DELETE_BLOG':{
    const updatedBlogs = state.filter( blog => blog.id !== action.deletePostID)
    return updatedBlogs
  }

  default:
    return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const addBlog = (newBlog) => {
  return  {
    type: 'ADD_BLOG',
    newBlog
  }
}

export const likeBlog = (updatedBlogID) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.submitUpdateToBlog(updatedBlogID)
      dispatch({
        type: 'UPDATE_BLOG',
        updatedBlog
      })
      // Good idea to have sorting as action?
      dispatch({ type: 'SORT_BY_LIKES' })
      dispatch(notifyWithTimeout(`Blog Liked!`, "notification-success"))
    } catch (err) {
      dispatch(notifyWithTimeout(`Update failed, ${err}`, "notification-error"))
    }

  }
}

export const removeBlog = (deletePostID) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogTitle = blogs.find(n => n.id === deletePostID).title
    try {
      if (window.confirm(`Do you really wanna delete ${blogTitle} ?`)){

        const response = await blogService.deleteBlogByID(deletePostID)

        if(response.status === 204){
            dispatch({
              type: 'DELETE_BLOG',
              deletePostID
            })
            dispatch(notifyWithTimeout('Post deleted successfully', "notification-success"))
        }

      } else dispatch(notifyWithTimeout('Deleting cancelled!', "notification-success"));

    } catch (err) {
      dispatch(notifyWithTimeout(`Delete failed, ${err}`, "notification-error"))
    }

  }
}

export default blogReducer
