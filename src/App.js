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
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  //Event listeners
  loginFieldHandler = (event) => {
    //Set state of credidentials, using spread syntax and computed values. Pretty c00l!!
    this.setState({
      credidentials: {...this.state.credidentials, [event.target.name]: event.target.value }
    })
  }

  submitLogin = async (event) => {

    event.preventDefault()

    const loginData = await loginService.loginUser(this.state.credidentials)

    this.setState({
      credidentials: {
        username: "",
        password: ""
      },
      loggedUser: loginData
    })

    console.log(loginData);

  }

  render() {

    if(this.state.loggedUser){

      return (
        <div>
        <p>Logged in as {this.state.loggedUser.name}</p>
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
