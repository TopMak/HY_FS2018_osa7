import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import usersService from '../../services/users'

// SUI components
import { Table } from 'semantic-ui-react'



const UsersView = ({users}) => {

// TODO Possible race condition with dispatches?
// Maybe users get fetched before it's updated...

    if(users.length > 0){
      // User name as key if names are unique
      // return (
      //   <div className="usersView">
      //     <h2>Users</h2>
      //     <table>
      //     <thead>
      //       <tr>
      //         <th>User</th>
      //         <th>Blogs</th>
      //       </tr>
      //     </thead>
      //       <tbody>
      //
      //         {users.map(user =>
      //           <tr key={user.id}>
      //             <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      //             <td>{user.blogs.length}</td>
      //           </tr>
      //         )}
      //       </tbody>
      //     </table>
      //   </div>
      // )

      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Blogs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map(user =>
              <Table.Row key={user.id} >
                <Table.Cell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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
