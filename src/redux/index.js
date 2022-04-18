import { combineReducers } from 'redux'

import articleReducer from './reducers/article'

const rootReducer = combineReducers({
  article: articleReducer
})

export default rootReducer
