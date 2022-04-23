import { combineReducers } from 'redux'

import articleReducer from './reducers/article'
import authReducer from './reducers/auth'

const rootReducer = combineReducers({
  article: articleReducer,
  auth: authReducer
})

export default rootReducer
