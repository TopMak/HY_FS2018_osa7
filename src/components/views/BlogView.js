import React from 'react'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../../reducers/blogReducer'

import Comments from '../Comments'

const BlogView = ({blogs, id, ...props}) => {


  const blogByID = (blogs,id) => blogs.find(a => a.id === id)
  const blog = blogByID(blogs,id)

  console.log(blog);

  if(blog) {
    // console.log(props.currentUser.username);
    // console.log(blog.user.username);
    const user = !blog.hasOwnProperty('user')
                 ? "anonymous" : (blog.user === null) ? {name: "anonymous"} : blog.user
    console.log(user);
    const showDelete = {display: (user.username === props.currentUser.username || user.name === "anonymous") ? '' : 'none'}

    return (
      <div className="blogView">
        <h2>{blog.name}</h2>
        <ul className="blogDetailsList">
          <li> URL: <a href={blog.url} rel="noopener noreferrer" target="_blank">{blog.url} </a></li>
          <li> {blog.likes} likes <button onClick={() => props.likeBlog(blog.id)}>Like</button> </li>
          <li> Added by user: {user.name} </li>
          <li> <button style={showDelete} onClick={() => props.removeBlog(blog.id)}>Delete</button> </li>
        </ul>
        <Comments comments={blog.comments} id={blog.id} />
      </div>
    )
  }
  else {
    return (
      <div className="blogView">
        <p> Loading data... </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.login.currentUser,
    users: state.login.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { likeBlog, removeBlog }
)(BlogView)
