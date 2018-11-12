import React from 'react'
import usersService from '../../services/users'


// const UsersView = (usersData) => {

class UsersView extends React.Component {

  state = {
    usersData: []
  }

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
            <tbody>
              <tr>
               <th>User</th>
               <th>Blogs</th>
              </tr>
              {this.state.usersData.map(user =>
                <tr key={user.name.replace(/\s/g, '').toLowerCase()}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
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
