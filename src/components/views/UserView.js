import React from 'react'
import { connect } from 'react-redux'

const UserView = ({users, id}) => {

  console.log('USERVIEW',users);

  const userByID = (users,id) => users.find(a => a.id === id)
  const user = userByID(users,id)

  console.log('userByID',userByID);
  if(user) {
    if(user.blogs.length === 0) {
      return (
        <p>User has no blogs!</p>
      )
    } else {
      return (
        <div className="userView">
          <h2>Blogs by {user.name}</h2>
          <table>
            <tbody>
              {user.blogs.map(blog =>
                <tr key={blog._id}><td>{blog.title} by {blog.author}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }
  }
  else {
    return (
      <div className="userView">
        <p> Loading data... </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.login.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserView)
