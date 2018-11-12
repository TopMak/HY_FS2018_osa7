const initState= {currentUser:''}


const loginReducer = (state = initState, action) => {
  // console.log('ACTION: ', action)
  switch(action.type) {

  case 'SET_LOGGED_USER': {
    const newCurrentUser = {...state, currentUser: action.currentUser}
    return newCurrentUser
  }

  default:
    return state
  }
}

//Action creators

export const setLoggedUser = (currentUser) => {
  return {
    type: 'SET_LOGGED_USER',
    currentUser
  }
}


export default loginReducer
