import React from 'react'
// import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'

import { loginUser, loginUserAnon } from '../reducers/loginReducer'

import Notification from './Notification'
// SUI components
import { Grid, Segment, Button, Form } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credidentials: { username: '', password: '' }
    }
  }

// const LoginForm = ({submitLogin, credidentials, formInputHandler}) => {

  // return (
  //
  //   <form onSubmit={submitLogin}>
  //     <div>
  //       Username
  //       <input
  //         type="text"
  //         name="username"
  //         value={credidentials.username}
  //         onChange={formInputHandler}
  //       />
  //     </div>
  //     <div>
  //       Password
  //       <input
  //         type="password"
  //         name="password"
  //         value={credidentials.password}
  //         onChange={formInputHandler}
  //       />
  //     </div>
  //     <button type="submit">Login</button>
  //   </form>
  //
  // )

  /* -- Event listeners -- */

  loginFieldHandler = (event) => {
    //Set state of credidentials, using spread syntax and computed values. Pretty c00l!!
    this.setState({
      credidentials: {...this.state.credidentials, [event.target.name]: event.target.value }
    })
  }

  submitLogin = async (event) => {

    event.preventDefault()
    this.props.loginUser(this.state.credidentials)
    this.setState({credidentials: { username: "", password: "" }})
  }


  render(){
    return (
      <div className="loginFormPage-loggedout" style={{ height: '100%' }}>

        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100%' }}>
              <Grid.Column style={{ maxWidth: 450 }}>
              <Notification />
                <Form onSubmit={this.submitLogin} size='large'>
                  <Segment raised>
                      <Form.Input fluid
                        type='text'
                        name='username'
                        placeholder='Username...'
                        icon='user circle'
                        iconPosition='left'
                        value={this.state.credidentials.username}
                        onChange={this.loginFieldHandler}
                      />
                      <Form.Input fluid
                        type='password'
                        name='password'
                        placeholder='Password...'
                        icon='lock'
                        iconPosition='left'
                        value={this.state.credidentials.password}
                        onChange={this.loginFieldHandler}
                      />
                    <Button type='submit'>Login</Button>
                    <Button onClick={() => this.props.loginUserAnon()}> Login as Anon</Button>
                  </Segment>
                </Form>
              </Grid.Column>
        </Grid>
      </div>

      // <form onSubmit={this.submitLogin}>
      //   <div>
      //     Username
      //     <input
      //       type="text"
      //       name="username"
      //       value={this.state.credidentials.username}
      //       onChange={this.loginFieldHandler}
      //     />
      //   </div>
      //   <div>
      //     Password
      //     <input
      //       type="password"
      //       name="password"
      //       value={this.state.credidentials.password}
      //       onChange={this.loginFieldHandler}
      //     />
      //   </div>
      //   <button type="submit">Login</button>
      // </form>

    )
  }
}

// LoginForm.propTypes = {
//   submitLogin: PropTypes.func.isRequired,
//   credidentials: PropTypes.object.isRequired,
//   formInputHandler: PropTypes.func.isRequired
// }

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.login.currentUser,
//     users: state.login.users,
//     blogs: state.blogs,
//     notification: state.notification
//   }
// }

export default connect(
  null,
  { loginUser, loginUserAnon }
)(LoginForm)
