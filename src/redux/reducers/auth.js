const initialState = {
  isLogin: false,
  userObj: {}
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN-IN':
      return { ...state, isLogin: true, userObj: action.payload }
    case 'LOGIN-OUT':
      return { ...state, isLogin: false, userObj: {} }
    default:
      return state
  }
}
export default authReducer
