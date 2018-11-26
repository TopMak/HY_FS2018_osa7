import React from 'react'
import { Link } from 'react-router-dom'
// redux
import { connect } from 'react-redux'

// Reducers
import { logoutUser } from '../reducers/loginReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer'

// SUI components
import { Menu, Button } from 'semantic-ui-react'

const NavMenu = (props) => {

  // const styleOpts = {
  //   padding: '5px',
  //   display: 'inline-block',
  //   borderStyle: 'solid',
  //   borderWidth: '2px',
  // }
  //
  // return (
  //   <div>
  //     <div style={styleOpts} >
  //       <Link to="/">Blogs</Link>
  //     </div >
  //     <div style={styleOpts} >
  //       <Link to="/users">Users</Link>
  //     </div >
  //   </div>
  // )

return (
  <div style={{ paddingTop: '50px' }} >
  <Menu stackable>
    <Menu.Item name='home' as={Link} to="/">
      Blogs
    </Menu.Item>
    <Menu.Item name='users' as={Link} to="/users">
      Users
    </Menu.Item>
    <Menu.Item name='test'>
      <Button onClick={() => props.notifyWithTimeout('test', "notification-success")} >Test</Button>
    </Menu.Item>
    <Menu.Item name='user' position='right'>
      Logged in as {props.currentUser.name}
    </Menu.Item>
    <Menu.Item name='logout'  >
      <Button primary onClick={() => props.logoutUser()} >Logout</Button>
    </Menu.Item>
  </Menu>
  </div>
  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.login.currentUser
  }
}

export default connect(
  mapStateToProps,
  { logoutUser, notifyWithTimeout }
)(NavMenu)

// export default NavMenu
