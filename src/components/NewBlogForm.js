import React from 'react'
// import blogService from '../services/blogs'

// SUI components
import { Button, Form, Segment } from 'semantic-ui-react'

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
      <Segment>
      <Form onSubmit={this.submitBlog}>
          <Form.Input fluid
            name='title'
            label='Title'
            placeholder='Enter blog title'
            value={this.state.newBlog.title}
            onChange={this.formInputHandler}
          />
          <Form.Input fluid
            name='author'
            label='Author'
            placeholder='Author of the blog'
            value={this.state.newBlog.author}
            onChange={this.formInputHandler}
          />
          <Form.Input fluid
            name='url'
            label='URL'
            placeholder='link to the blog'
            value={this.state.newBlog.url}
            onChange={this.formInputHandler}
          />
        <Button type='submit'>Submit</Button>
      </Form>
      </Segment>

    )
  }

}

export default connect(
  null,
  { notifyWithTimeout, addBlog }
)(NewBlogForm)
