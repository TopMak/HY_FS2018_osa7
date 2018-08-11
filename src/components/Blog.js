import React from 'react'

import '../app.css';

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    //  isHovering: false,  //Added hover state in here, but prefer standard css actually...
      isVisible: false
    }
  }

  toggleOnClick = () => {
    this.setState({visible: !this.state.visible})
  }


  render() {

    const showWhenVisible = { display: this.state.visible ? '' : 'none', listStyleType:"none", }
    //If user doesn't exist, we call user "anonymous" to prevent UI errors
    const user = !this.props.blog.hasOwnProperty('user') ? "anonymous" : (this.props.blog.user === null) ? "anonymous" : this.props.blog.user.name

    //Prefer onClick function in tittle paragraph, instead in whole div)
    return(
      <div>
        <p className="blogDiv" onClick={this.toggleOnClick}>{this.props.blog.title} - {this.props.blog.author} </p>
          <ul style={showWhenVisible}>
            <li> URL: <a href={this.props.blog.url} target="_blank">{this.props.blog.url} </a></li>
            <li> {this.props.blog.likes} likes <button onClick={this.props.like(this.props.blog.id)}>Like</button> </li>
            <li> Added by user: {user} </li>
            <li> <button onClick={this.props.delete(this.props.blog.id)}>Delete</button> </li>
          </ul>
      </div>

    )
  }

}

export default Blog
