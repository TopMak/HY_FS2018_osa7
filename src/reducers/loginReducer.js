import usersService from '../services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'

// Other action creators
import { notifyWithTimeout } from './notificationReducer'

const initState= {currentUser: undefined, users:[]}


const loginReducer = (state = initState, action) => {
  // console.log('ACTION: ', action)
  switch(action.type) {

  case 'SET_LOGGED_USER': {
    const newCurrentUser = {...state, currentUser: action.currentUser}
    return newCurrentUser
  }

  case 'SET_OTHER_USERS': {
    const newOtherUsers = {...state, users: action.users}
    return newOtherUsers
  }

  default:
    return state
  }
}

//Action creators

// If valid login exists, set LoggedUser and get other users
// Can be later changed eg. only for "admin users"
export const loginUser = (credidentials) => {
  return async (dispatch) => {
    try {
      const loginData = await loginService.loginUser(credidentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginData))
      blogService.setToken(loginData.token)
      dispatch({ type: 'SET_LOGGED_USER', currentUser:loginData })
      dispatch(getUsers())
      dispatch(notifyWithTimeout('Login success!', "notification-success"))
    } catch (err) {
      // console.log(err.response)
      // console.log(err.status)
      dispatch(notifyWithTimeout(`Login failed, ${err.response.data.error}`, "notification-error"))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    dispatch(setLoggedUser(''))
    dispatch(notifyWithTimeout("See you next time!", "notification-success"))
  }
}

//If credidentials are stored in window.localStorage
export const setLoggedUser = (currentUser) => {
  blogService.setToken(currentUser.token)
  return { type: 'SET_LOGGED_USER', currentUser }
}

// Get data for users view
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: 'SET_OTHER_USERS',
        users
      })
    } catch (err) {
      console.log(err);
    }
  }
}

// ORIGINAL
// export const setLoggedUser = (currentUser) => {
//   return {
//     type: 'SET_LOGGED_USER',
//     currentUser
//   }
// }



export default loginReducer
