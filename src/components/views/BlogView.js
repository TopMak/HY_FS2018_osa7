import React from 'react'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../../reducers/blogReducer'
import { notifyWithTimeout } from '../../reducers/notificationReducer'

import Comments from '../Comments'

// SUI components
import { List, Icon, Button, Divider, Segment } from 'semantic-ui-react'

const BlogView = ({blogs, id, history, ...props}) => {


  const blogByID = (blogs,id) => blogs.find(a => a.id === id)
  const blog = blogByID(blogs,id)

  const removePost = (blog, props) => {
    if (window.confirm(`Do you really wanna delete ${blog.title} ?`)) {
      props.removeBlog(blog.id)
      history.push('/')
    } else {
      props.notifyWithTimeout('Deleting cancelled!', "notification-success")
    }
  }

  // console.log(blog);

  if(blog) {
    // console.log(props.currentUser.username);
    // console.log(blog.user.username);
    const user = !blog.hasOwnProperty('user')
                 ? "anonymous" : (blog.user === null) ? {name: "anonymous"} : blog.user
    // console.log(user);
    // Old version
    // const showDelete = {display: (user.username === props.currentUser.username || user.name === "anonymous") ? '' : 'none'}
    const hideDelete = !(user.username === props.currentUser.username || user.name === "anonymous")
    // console.log(userCanDelete);

    // return (
    //   <div className="blogView">
    //     <h2>{blog.title}</h2>
    //     <ul className="blogDetailsList">
    //       <li> URL: <a href={blog.url} rel="noopener noreferrer" target="_blank">{blog.url} </a></li>
    //       <li> {blog.likes} likes <button onClick={() => props.likeBlog(blog.id)}>Like</button> </li>
    //       <li> Added by user: {user.name} </li>
    //       <li> <button style={showDelete} onClick={() => {props.removeBlog(blog.id); history.push('/')}}>Delete</button> </li>
    //     </ul>
    //     <Comments comments={blog.comments} id={blog.id} />
    //   </div>
    // )
    return (
      <div className="blogView">
      <Segment>
        <h2>{blog.title}</h2>
        <Segment>
        <List size='huge'>
          <List.Item icon='pencil alternate' content={`Blog author: ${blog.author}`} />
          <List.Item icon='user' content={`Added by user: ${user.name}`} />
          <List.Item icon='thumbs up outline' content={`${blog.likes} likes`} />
          <List.Item>
            <List.Icon name='linkify' />
            <List.Content>
              <a href={blog.url} rel="noopener noreferrer" target="_blank">{blog.url} </a>
            </List.Content>
          </List.Item>
        </List>
        <div>
          <Button primary  icon='thumbs up outline' content='Like' onClick={() => props.likeBlog(blog.id)} />
          <Button negative disabled={hideDelete} icon='delete' content='Delete' onClick={() => removePost(blog, props)} />
        </div>
        <Divider />
        <Comments comments={blog.comments} id={blog.id} />
        </Segment>
      </Segment>
      </div>
    )
  }
  else {
    return (
      <div className="blogView">
        <p> {"No blog with this ID!"} </p>
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
  { likeBlog, removeBlog, notifyWithTimeout }
)(BlogView)
