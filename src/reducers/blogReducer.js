
import blogService from '../services/blogs'

import { notifyWithTimeout } from './notificationReducer'
import { getUsers } from './loginReducer'

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

  case 'REMOVE_BLOG':{
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

  return async (dispatch) => {

    try {

      const response = await blogService.submitNewBlog(newBlog)

      dispatch({
        type: 'ADD_BLOG',
        newBlog: response
      })
      // Update users and set notification
      dispatch(getUsers())
      dispatch(notifyWithTimeout(`New post added!`, "notification-success"))
    } catch (err) {
        console.log(err.response);
        dispatch(notifyWithTimeout(`Adding post failed, ${err.response.statusText}`, "notification-error"))
    }
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
    // const blogs = getState().blogs
    // const blogTitle = blogs.find(n => n.id === deletePostID).title
    try {
      // NOTE Moved confirmation from here to blogView
      // if (window.confirm(`Do you really wanna delete ${blogTitle} ?`)){

        const response = await blogService.deleteBlogByID(deletePostID)

        if(response.status === 204){
            dispatch({
              type: 'REMOVE_BLOG',
              deletePostID
            })
            // Update users and set notification
            dispatch(getUsers())
            dispatch(notifyWithTimeout('Post deleted successfully', "notification-success"))
        }
      // NOTE Moved confirmation from here to blogView
      // } else dispatch(notifyWithTimeout('Deleting cancelled!', "notification-success"));

    } catch (err) {
      dispatch(notifyWithTimeout(`Delete failed, ${err}`, "notification-error"))
    }

  }
}

// Update blog with a comment
export const submitComment = (commentBlogID, comment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.submitComment(commentBlogID, comment)

      if(response.status === 204){
          return dispatch(notifyWithTimeout('String was empty or false!', "notification-error"))
      } else {

        dispatch({
          type: 'UPDATE_BLOG',
          updatedBlog: response.data
        })
        // Good idea to have sorting as action?
        dispatch({ type: 'SORT_BY_LIKES' })
        dispatch(notifyWithTimeout(`New comment! '${comment}'`, "notification-success"))
      }
    } catch (err) {
      dispatch(notifyWithTimeout(`Submit comment failed, ${err}`, "notification-error"))
    }

  }
}

export default blogReducer
