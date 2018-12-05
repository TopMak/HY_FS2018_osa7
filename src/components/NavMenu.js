import React from 'react'
import { Link } from 'react-router-dom'
// redux
import { connect } from 'react-redux'

// Reducers
import { logoutUser } from '../reducers/loginReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer'

// SUI components
import { Menu, Button, Divider, Header, Dropdown, Icon, Confirm } from 'semantic-ui-react'

// const NavMenu = (props) => {

class NavMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }


// Confirm handlers
// open = () => this.setState({ open: true })
// close = () => this.setState({ open: false })
handleOpen = (args) => this.setState({ open: args })

// logout handler
handleLogout = () => {
  this.handleOpen(false)
  this.props.logoutUser()
}

render() {

  const options = [
    {
      key: 1,
      content: <Button onClick={() => this.props.notifyWithTimeout(' long long test notification', "notification-success")} >Test</Button>
    },
    {
      key: 2,
      content: <Button primary onClick={() => this.handleOpen(true)} >Logout</Button>
      // content: <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
      // content: <Button primary onClick={() => this.props.logoutUser()} >Logout</Button>
    }
  ]

  return (
    <div style={{ paddingTop: '50px' }} >
      <Menu tabular >
        <Menu.Item name='home' as={Link} to="/">
          <Header as='h2'>
            Blogs
          </Header>
        </Menu.Item>
        <Menu.Item name='users' as={Link} to="/users">
          <Header as='h2'>
            Users
          </Header>
        </Menu.Item>
        <Menu.Item name='dropdown' position='right'>
          <Dropdown text={this.props.currentUser.name} options={options} pointing='top right' icon='user' />
          <Confirm
          content='Do you really want to logout?'
          cancelButton='No'
          confirmButton="Yes"
          open={this.state.open}
          onCancel={() => this.handleOpen(false)}
          onConfirm={() => this.handleLogout()} />
        </Menu.Item>
      </Menu>
    </div>
    )

}



// return (
//   <div style={{ paddingTop: '50px' }} >
//   <Menu borderless>
//     <Menu.Item name='home' as={Link} to="/">
//       <h2 style={{centerAlign:'center'}}>Blogs</h2>
//     </Menu.Item>
//
//     <Menu.Item name='users' as={Link} to="/users">
//       <Header as='h2' textAlign='center'>
//         Users
//       </Header>
//     </Menu.Item>
//
//     <Menu.Item name='test' >
//       <Button onClick={() => props.notifyWithTimeout(' long long test notification', "notification-success")} >Test</Button>
//     </Menu.Item>
//
//     <Menu.Item name='user' position='right'>
//       Logged in as {props.currentUser.name}
//     </Menu.Item>
//
//     <Menu.Item name='logout'  >
//       <Button primary onClick={() => props.logoutUser()} >Logout</Button>
//     </Menu.Item>
//   </Menu>
//   </div>
//   )
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
