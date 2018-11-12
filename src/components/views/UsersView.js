import React from 'react'
import { Link } from 'react-router-dom'
import usersService from '../../services/users'



// const UsersView = (usersData) => {

class UsersView extends React.Component {

  state = {
    usersData: []
  }

  // Fetches always users from server when mounts
  // Maybe use store instead?
  componentDidMount(){

    usersService
      .getAll()
      .then( usersData => this.setState({usersData}))

  }

  render(){
    if(this.state.usersData.length > 0){
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

              {this.state.usersData.map(user =>
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
}



export default UsersView
