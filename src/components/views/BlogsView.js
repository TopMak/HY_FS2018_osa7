import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// SUI components
import { Card } from 'semantic-ui-react'

// components
// import Blog from '../Blog'

const BlogsView = (props) => {
  // console.log(props);
  // return (
  //   <div className="blogView">
  //     <h2>Blogs</h2>
  //     {props.blogs.map(blog =>
  //       <div key={blog.id} style={{padding:'5px'}}>
  //         <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
  //       </div>
  //     )}
  //   </div>
  // )
  return (
    <div>
    <h2>Blogs</h2>
    <Card.Group>
        {props.blogs.map(blog =>
          <Card key={blog.id}>
            <Card.Content as={Link} to={`/blogs/${blog.id}`}>
              <Card.Header>{blog.title}</Card.Header>
              <Card.Meta> {blog.likes} likes</Card.Meta>
              <Card.Description>{blog.author}</Card.Description>
            </Card.Content>
          </Card>
        )}
    </Card.Group>
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
