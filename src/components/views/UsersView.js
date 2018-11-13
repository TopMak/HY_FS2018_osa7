import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import usersService from '../../services/users'



const UsersView = ({users}) => {

// TODO Possible race condition with dispatches?
// Maybe users get fetched before it's updated...

    if(users.length > 0){
      // User name as key if names are unique
      return (
        <div className="usersView">
          <h2>Users</h2>
          <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs</th>
            </tr>
          </thead>
            <tbody>

              {users.map(user =>
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )

    } else {

      return (
        <div className="usersView">
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
)(UsersView)
