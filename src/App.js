import React from 'react'
import blogService from './services/blogs'
// redux
import { connect } from 'react-redux'
//My components
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

// action imports
import { notifyWithTimeout } from './reducers/notificationReducer'

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
      loggedUser : null
    }
  }

  componentDidMount() {
    //On mount, fetch blogs
    console.log("Component APP mounts");
    blogService.getAll().then(blogs => {
      const sorted = this.blogsSortByLikes(blogs)
      //console.log(sorted);
      this.setState({ blogs: sorted })
      //this.setState({ blogs })
    })

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
    //Clear the variable in blogService as well
    blogService.setToken(null)
    this.setState( { loggedUser: null })
    this.props.notifyWithTimeout("Logout!", "notification-success")
  }

  addToBlogs = (newBlog) => {
    this.setState( { blogs: this.state.blogs.concat(newBlog) } )
  }

  //Every times blog is updated (like pressed, it will sort the likes. --> not very efficient?)
  //Not problem with few blogs, but with many --> "compare blog likes with one ahead of blog" (since you can only increment it...)
  updateBlogs = (updatedBlog) => {
    const updatedBlogs = this.state.blogs.map( blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    //this.setState( { blogs: updatedBlogs } )
    this.setState( {blogs: this.blogsSortByLikes(updatedBlogs)})
  }


  blogsSortByLikes = (blogs) => {
    return blogs.concat().sort( (a,b) => b.likes - a.likes);
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
        credidentials: { username: "", password: "" },
        loggedUser: loginData,
      })
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

  //Took a while to figure this out!!
  //Render an async function into event source (button)
  submitLike = (updatedBlogID) => {
  return async () => {
    try {
        console.log("Like pressed! blogid: ", updatedBlogID);
        const updatedBlog = await blogService.submitUpdateToBlog(updatedBlogID)
        //console.log(updatedData);

        // const updatedBlogs = this.state.blogs.map( blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        // this.setState( { blogs: updatedBlogs } )
        this.updateBlogs(updatedBlog)   //Separate function, since we can use this with delete too!

      } catch (err) {
        this.props.notifyWithTimeout(`Update failed, ${err}`, "notification-error")
      }
   }
  }

  deletePost = (deletePostID) => {
    return async () =>{
      try {
        console.log("Delete pressed! blogid: ", deletePostID);

        if (window.confirm("Do you really wanna delete" + this.state.blogs.find(n => n.id === deletePostID).title + " ?")) {

          const response = await blogService.deleteBlogByID(deletePostID)
          //console.log(response.status);
          if(response.status === 204){
              console.log("delete succesful");
              const updatedBlogs = this.state.blogs.filter( blog => blog.id !== deletePostID)
              this.setState({ blogs : updatedBlogs })
              this.props.notifyWithTimeout('Post deleted successfully', "notification-success")
          }
        } else {
          console.log("Cancelled")
        }

      } catch (err) {
          this.props.notifyWithTimeout(`Delete failed, ${err}`, "notification-error")
      }
    }
  }

  render() {


    if(this.state.loggedUser){

      return (
        <div className="blogView">
          <Notification />
          <p>
            Logged in as {this.state.loggedUser.name} <button onClick={this.logoutHandler}>Logout</button>
          </p>
          <Togglable buttonLabel="New blog" ref={component => this.blogForm = component}>
            <NewBlogForm
            addBlog={this.addToBlogs}
            toggle={this.blogForm}
            />
          </Togglable>
          <h2>Blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} like={this.submitLike} delete={this.deletePost} currentUsername={this.state.loggedUser.username}/>
          )}
        </div>
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { notifyWithTimeout }
)(App)
