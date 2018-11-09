import React from 'react'
import PropTypes from 'prop-types'

import '../app.css';

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    //  isHovering: false,  //Added hover state in here, but css works too...
      isVisible: false
    }
  }

  toggleOnClick = () => {
    this.setState({visible: !this.state.visible})
  }


  render() {

    const showWhenVisible = { display: this.state.visible ? '' : 'none', listStyleType:"none", }
    //If user doesn't exist, we call user "anonymous" to prevent UI errors
    const user = !this.props.blog.hasOwnProperty('user') ? "anonymous" : (this.props.blog.user === null) ? {username: "anonymous"} : this.props.blog.user

    //Render delete button if the current user is the blog entry owner or anonymous. NOTE check done using username, not ids
    const showDelete = {display: (user.username === this.props.currentUsername || user.username === "anonymous") ? '' : 'none'}

    //Prefer onClick function in tittle paragraph, instead in whole div)
    return(
      <div className="wholeBlog">
        <p className="blogDiv" onClick={this.toggleOnClick}>{this.props.blog.title} - {this.props.blog.author} </p>
          <ul style={showWhenVisible} className="blogDetailsList">
            <li> URL: <a href={this.props.blog.url} rel="noopener noreferrer" target="_blank">{this.props.blog.url} </a></li>
            <li> {this.props.blog.likes} likes <button onClick={this.props.like(this.props.blog.id)}>Like</button> </li>
            <li> Added by user: {user.username} </li>
            <li> <button style={showDelete} onClick={this.props.delete(this.props.blog.id)}>Delete</button> </li>
          </ul>
      </div>

    )
  }

}

Blog.propTypes = {
  delete: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired
}

export default Blog
