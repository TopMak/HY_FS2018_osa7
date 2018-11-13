import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// components
// import Blog from '../Blog'

const BlogsView = (props) => {
  // console.log(props);
  return (
    <div className="blogView">
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <div key={blog.id} style={{padding:'5px'}}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.login.currentUser
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogsView)
