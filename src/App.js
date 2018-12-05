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
// import Blog from './components/Blog'
import NavMenu from './components/NavMenu'

// ViewComponents --> "pages"
import UsersView from './components/views/UsersView'
import UserView from './components/views/UserView'
import BlogsView from './components/views/BlogsView'
import BlogView from './components/views/BlogView'


// action imports
import { notifyWithTimeout } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setLoggedUser, loginUser, logoutUser, getUsers } from './reducers/loginReducer'

//My services
// import blogService from './services/blogs'
// import loginService from './services/login'
// import usersService from './services/users'

// SUI components
import { Container } from 'semantic-ui-react'

//Styles
import './semantic/dist/semantic.min.css';
import './app.css';


class App extends React.Component {

  componentDidMount() {
    //On mount, fetch blogs
    this.props.initBlogs()

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if(loggedInUserJSON){
      const userData = JSON.parse(loggedInUserJSON)
      console.log(userData);
      this.props.setLoggedUser(userData)
      this.props.getUsers()
    }
  }



  render() {
    // TODO router switch currently kinda useless
    // TODO fix links to ids for switch

    if(this.props.currentUser){
      return (

        <Router>
          <Container>
          <div style={{position:'fixed', left: '50%', transform: 'translate(-50%, 2%)'}}>
            <Notification />
          </div>
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
            <Togglable buttonLabel="New blog" ref={component => this.blogForm = component}>
              <NewBlogForm toggle={this.blogForm} />
            </Togglable>
          </Container>
        </Router>

      )

    } else {

      return (
          <Container style={{ height: '100%' }}>
            <LoginForm/>
          </Container>
      )

      // return (
      //   // <div className="loginFormPage-loggedout">
      //   //   <Notification />
      //   //   <LoginForm/>
      //   // </div>
      // )
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
  { initBlogs, notifyWithTimeout, setLoggedUser, loginUser, logoutUser, getUsers }
)(App)
