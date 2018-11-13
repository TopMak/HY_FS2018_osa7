import usersService from '../services/users'

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
export const setLoggedUser = (currentUser) => {

  return async (dispatch) => {
    dispatch({ type: 'SET_LOGGED_USER', currentUser })
    try {
      const updatedBlog = await usersService.getAll()

    } catch (err) {
      console.log(err);
    }
  }
}

// Get data for users view
export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_OTHER_USERS',
      users
    })
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
