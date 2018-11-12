import React from 'react'
import { connect } from 'react-redux'

// components
import Blog from '../Blog'

const BlogsView = (props) => {
  console.log(props);
  return (
    <div className="blogView">
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} currentUsername={props.loggedUser.username}/>
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


// const BlogsView = () => {
//
//   return (
//     <div className="blogView">
//       <Notification />
//       <p>
//         Logged in as {this.state.loggedUser.name} <button onClick={this.logoutHandler}>Logout</button>
//       </p>
//       <Togglable buttonLabel="New blog" ref={component => this.blogForm = component}>
//         <NewBlogForm toggle={this.blogForm} />
//       </Togglable>
//       <h2>Blogs</h2>
//       {this.props.blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} currentUsername={this.state.loggedUser.username}/>
//       )}
//     </div>
//   )
// }
