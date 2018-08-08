import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

//My components
import LoginForm from './components/LoginForm'

//My services
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      credidentials: {
        username: "",
        password: ""
      },
      loggedUser : null

    }
  }

  componentDidMount() {
    //On mount, fetch blogs
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if(loggedInUserJSON){
      const userData = JSON.parse(loggedInUserJSON)
      this.setState({loggedUser: userData})
    }

  }

  //Event listeners
  loginFieldHandler = (event) => {
    //Set state of credidentials, using spread syntax and computed values. Pretty c00l!!
    this.setState({
      credidentials: {...this.state.credidentials, [event.target.name]: event.target.value }
    })
  }

  logoutHandler = (event) => {
    //Clear the current user from app state and localStorage
    window.localStorage.removeItem('loggedInUser')
    this.setState( { loggedUser: null } )
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
        loggedUser: loginData
      })

      //console.log(loginData)

    } catch (err) {
      //Maybe display errors to user via notifications? Now just console.log
      console.log(err)
    }
  }

  render() {

    if(this.state.loggedUser){

      return (
        <div>
          <p>
            Logged in as {this.state.loggedUser.name} <button onClick={this.logoutHandler}>Logout</button>
          </p>
        
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      )

    } else {

      return (
      <LoginForm submitLogin={this.submitLogin} credidentials={this.state.credidentials} formInputHandler={this.loginFieldHandler}/>
      )
    }

  }
}

export default App;
