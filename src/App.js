import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

// redux
import { connect } from 'react-redux'
//My components
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import NavMenu from './components/NavMenu'

// ViewComponents --> "pages"
import UsersView from './components/views/UsersView'
import UserView from './components/views/UserView'
import BlogsView from './components/views/BlogsView'
import BlogView from './components/views/BlogView'


// action imports
import { notifyWithTimeout } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setLoggedUser, getUsers } from './reducers/loginReducer'

//My services
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'

//Styles
import './app.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // blogs: [],
      credidentials: {
        username: "",
        password: ""
      },
      // users: []
      // ,
      // loggedUser : null
    }
  }

  componentDidMount() {
    //On mount, fetch blogs
    this.props.initBlogs()

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    // if(loggedInUserJSON === "undefined" || "null"){
    //   // console.log("nullia tai undefined");
    //   return window.localStorage.removeItem('loggedInUser')
    // }

    if(loggedInUserJSON){
      const userData = JSON.parse(loggedInUserJSON)
      console.log(userData);
      this.props.setLoggedUser(userData)
      this.props.getUsers()
      // this.setState({loggedUser: userData})
      blogService.setToken(userData.token)
    }

  }

  /* -- Event listeners -- */

  loginFieldHandler = (event) => {
    //Set state of credidentials, using spread syntax and computed values. Pretty c00l!!
    this.setState({
      credidentials: {...this.state.credidentials, [event.target.name]: event.target.value }
    })
  }

  logoutHandler = (event) => {
    //Clear the current user from app state and localStorage
    window.localStorage.removeItem('loggedInUser')
    //Clear the variable in blogService as well
    blogService.setToken(null)
    this.props.setLoggedUser('')
    // this.setState( { loggedUser: null })
    this.props.notifyWithTimeout("Logout!", "notification-success")
  }


  submitLogin = async (event) => {

    event.preventDefault()

    //try-catch for login errors
    try {

      const loginData = await loginService.loginUser(this.state.credidentials)
      blogService.setToken(loginData.token)
      //console.log(loginData);
      //If succesful login, set user information to localStorage
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginData))

      this.setState({
        credidentials: { username: "", password: "" }
        // ,
        // loggedUser: loginData
      })
      this.props.setLoggedUser(loginData)
      this.props.notifyWithTimeout('Login success!', "notification-success")

      //console.log(loginData)

    } catch (err) {
      //Maybe display errors to user via notifications? Now just console.log
      console.log(err.response)
      // console.log(err.status)
      this.setState({ credidentials: { username: "", password: "" } })
      this.props.notifyWithTimeout(`Login failed, ${err.response.data.error}`, "notification-error")
    }
  }


  render() {
    // TODO router switch currently kinda useless
    // TODO fix links to ids for switch
    
    if(this.props.currentUser){
      return (
        <Router>
        <div>
        <Notification />
        <p>
          Logged in as {this.props.currentUser.name} <button onClick={this.logoutHandler}>Logout</button>
        </p>
        <Togglable buttonLabel="New blog" ref={component => this.blogForm = component}>
          <NewBlogForm toggle={this.blogForm} />
        </Togglable>

          <NavMenu />

          <Switch>
            <Route exact path="/" component={BlogsView}/>
            <Route exact path="/users" component={UsersView}/>
            <Route exact path="/users/:id" component={({match}) =>
                <UserView id={match.params.id} />}/>
            <Route exact path="/blogs/:id" component={({match, history}) =>
                <BlogView history={history} id={match.params.id} />}/>
            <Route component={NoMatch} />
          </Switch>
          </div>
        </Router>
      )

    } else {

      return (
        <div className="loginFormPage-loggedout">
          <Notification />
          <LoginForm submitLogin={this.submitLogin} credidentials={this.state.credidentials} formInputHandler={this.loginFieldHandler}/>
        </div>
      )
    }

  }
}


const NoMatch = ({ location }) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.login.currentUser,
    users: state.login.users,
    blogs: state.blogs,
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { initBlogs, notifyWithTimeout, setLoggedUser, getUsers }
)(App)
