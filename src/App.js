import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

//My components
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


//My services
import loginService from './services/login'

//Styles
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      credidentials: {
        username: "",
        password: ""
      },
      loggedUser : null,
      notification: {message: null, style: null}
    }
  }

  componentDidMount() {
    //On mount, fetch blogs
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    // if(loggedInUserJSON === "undefined" || "null"){
    //   // console.log("nullia tai undefined");
    //   return window.localStorage.removeItem('loggedInUser')
    // }

    if(loggedInUserJSON){
      const userData = JSON.parse(loggedInUserJSON)
      this.setState({loggedUser: userData})
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
    this.setState( {
      loggedUser: null ,
      notification: {message: "Logout!", style: "notification-success"}
    })
    this.notificationTimeout(5000)
  }

  addToBlogs = (newBlog) => {
    this.setState( { blogs: this.state.blogs.concat(newBlog) } )
  }

  setNotification = (notification, sec) => {
    this.setState( { notification } )
    this.notificationTimeout(sec)
  }

  notificationTimeout(sec){
    setTimeout((sec) => {
      console.log("timeout");
      this.setState({notification: {message: null, style: null}})
      }, sec)
  }


  submitLogin = async (event) => {

    event.preventDefault()

    //try-catch for login errors
    try {

      const loginData = await loginService.loginUser(this.state.credidentials)

      //If succesful login, set user information to localStorage
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginData))

      this.setState({
        credidentials: { username: "", password: "" },
        loggedUser: loginData,
        notification: {message: "Login success!", style: "notification-success"}
      })
      this.notificationTimeout(5000)

      //console.log(loginData)

    } catch (err) {
      //Maybe display errors to user via notifications? Now just console.log
      console.log(err.response)
      // console.log(err.status)
      this.setState({
        credidentials: { username: "", password: "" },
        notification: {message: `Login failed, ${err.response.data.error}`, style: "notification-error"}
      })
      this.notificationTimeout(5000)
    }
  }

  render() {


    if(this.state.loggedUser){

      return (
        <div>
          <Notification notification={this.state.notification} />
          <p>
            Logged in as {this.state.loggedUser.name} <button onClick={this.logoutHandler}>Logout</button>
          </p>
          <Togglable buttonLabel="New blog" ref={component => this.blogForm = component}>
            <NewBlogForm
            addBlog={this.addToBlogs}
            sendNotification={this.setNotification}
            toggle={this.blogForm} 
            />
          </Togglable>
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      )

    } else {

      return (
        <div>
          <Notification notification={this.state.notification} />
          <LoginForm submitLogin={this.submitLogin} credidentials={this.state.credidentials} formInputHandler={this.loginFieldHandler}/>
        </div>
      )
    }

  }
}

export default App;
