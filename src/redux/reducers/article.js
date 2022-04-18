const initialState = {
  isLoaded: true,
  data: [],
  articlesCount: 0,
  artItem: {}
}
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload.articles,
        articlesCount: action.payload.articlesCount
      }
    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload
      }
    case 'SET_ARTICLE_ITEM':
      return {
        ...state,
        artItem: action.payload.article
      }
    default:
      return state
  }
}
export default articleReducer
