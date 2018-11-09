import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducer imports
import notificationReducer from './reducers/notificationReducer'



// Let's expect we will have more reducers --> wrap with combineReducers
const comReducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(
  comReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// console.log(store.getState())

export default store
