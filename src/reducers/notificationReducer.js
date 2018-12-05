const initState= {message:'', style: '', open: false}


const notificationReducer = (state = initState, action) => {
  // console.log('ACTION: ', action)
  switch(action.type) {

  case 'SET_NOTIF': {
    const newNotification = { message: action.message, style: action.style, open: true }
    return newNotification
  }
  case 'CLEAR_NOTIF': {
    // reset to initState
    return initState
  }
  default:
    return state
  }
}

//Action creators

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIF'
  }
}

export const notifyWithTimeout = (message, style, timeoutSecs=5) => {
  // TODO save timer reference in order to reset it for next notification
  return (dispatch) => {

    dispatch({type: 'SET_NOTIF', message, style})

    setTimeout(() => {
        dispatch({type: 'CLEAR_NOTIF'})
    }, timeoutSecs*1000);
  };


}


export default notificationReducer
