import React from 'react'
import { connect } from 'react-redux'
// import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { submitComment } from '../reducers/blogReducer'

// SUI components
import { Feed, Icon, Input, Button } from 'semantic-ui-react'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment:''
    }
  }

  submitComment = (e) => {
    e.preventDefault()
    console.log("Submitted comment!", this.state.comment);

    this.props.submitComment(this.props.id,this.state.comment)
    // reset fields
    this.setState({comment:''})
  }

  handleComment = (e) => {
    // console.log(event.target.value);
    this.setState({comment: e.target.value })
  }

  render() {
    const {comments, id} = this.props
    if(comments.length > 0){
      // TODO something else than index as comment's key
      // return (
      //   <div className="commentsView">
      //     <h4>Comments</h4>
      //     <ul>
      //       {comments.map((comment, idx) => <li key={idx}>{comment}</li>)}
      //     </ul>
      //     <CommentForm
      //     value={this.state.comment}
      //     submitComment={this.submitComment}
      //     handleComment={this.handleComment}
      //     />
      //   </div>
      // )

      return (
        <div className="commentsView">
        <Feed>
        {comments.map((comment, idx) =>
        <Feed.Event key={idx}>
            <Feed.Label>
             <Icon name='user' />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                anonymous user comments
                <Feed.Date>3 days ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                {comment}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        )}
          </Feed>
          <CommentForm
          value={this.state.comment}
          submitComment={this.submitComment}
          handleComment={this.handleComment}
          />
      </div>

      )

    } else {
      return (
        <div className="commentsView">
        <p>No comments</p>
        <CommentForm
        value={this.state.comment}
        submitComment={this.submitComment}
        handleComment={this.handleComment} />
        </div>
      )
    }
  }
}

// export default Comments

export default connect(
  null,
  { submitComment }
)(Comments)


const CommentForm = ({submitComment, handleComment, value}) => {

  return (
    <form onSubmit={submitComment}>
      <div>
        <Input
          value={value}
          type="text"
          name="comment"
          onChange={handleComment}
        />
        <Button type="submit">Comment</Button>
      </div>
    </form>
  )
}
