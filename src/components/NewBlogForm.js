import React from 'react'
// import blogService from '../services/blogs'
// redux
import { connect } from 'react-redux'

import { notifyWithTimeout } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'


class NewBlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlog: {
        title : "",
        author : "",
        url : ""
      }
    }
  // console.log(this.props)
  }

  submitBlog = async (event) => {
    event.preventDefault()
    this.props.addBlog(this.state.newBlog)
    //console.log(response)
    console.log("submitted a blog!");
    this.props.toggle.toggleVisibility()
    //Reset state to default after valid submit
    this.setState({ newBlog: { title : "", author : "", url : ""}} )
  }

  formInputHandler = (event) => {
    //Set state using spread syntax and computed values. Pretty c00l!!
    this.setState({
      newBlog: {...this.state.newBlog, [event.target.name]: event.target.value }
    })
  }

  render(){
    return (

      <form onSubmit={this.submitBlog}>
        <div>
          tittle
          <input
            type="text"
            name="title"
            value={this.state.newBlog.title}
            onChange={this.formInputHandler}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={this.state.newBlog.author}
            onChange={this.formInputHandler}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={this.state.newBlog.url}
            onChange={this.formInputHandler}
          />
        </div>
        <button type="submit">Submit blog</button>
      </form>

    )
  }

}

export default connect(
  null,
  { notifyWithTimeout, addBlog }
)(NewBlogForm)
