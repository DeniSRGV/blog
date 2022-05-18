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
    case 'FAVORITE_ARTICLE':
      return {
        ...state,
        data: state.data.map((item) =>
          item.slug === action.payload.slug ? action.payload : item
        )
      }
    case 'FAVORITE_ARTICLE_ITEM':
      return {
        ...state,
        artItem:
          state.artItem.slug === action.payload.slug
            ? action.payload
            : state.artItem
      }

    default:
      return state
  }
}
export default articleReducer
