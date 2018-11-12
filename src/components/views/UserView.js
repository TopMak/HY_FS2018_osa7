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

// class UsersView extends React.Component {
//
//   state = {
//     usersData: []
//   }
//
//   componentDidMount(){
//
//     usersService
//       .getAll()
//       .then( usersData => this.setState({usersData}))
//
//   }
//
//   render(){
//     if(this.state.usersData.length > 0){
//       // User name as key if names are unique
//       return (
//         <div className="usersView">
//           <h2>Users</h2>
//           <table>
//             <tbody>
//               <tr>
//                <th>User</th>
//                <th>Blogs</th>
//               </tr>
//               {this.state.usersData.map(user =>
//                 <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )
//
//     } else {
//
//       return (
//         <div className="usersView">
//           <p> Loading data... </p>
//         </div>
//       )
//     }
//   }
// }
//
//
//
// export default UsersView

const mapStateToProps = (state) => {
  return {
    users: state.login.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserView)
