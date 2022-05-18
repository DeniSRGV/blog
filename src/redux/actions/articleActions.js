import ServiceApi from '../../services/ServiceApi'
export const setArticle = (payload) => ({
  type: 'SET_DATA',
  payload
})
export const setArticleItem = (payload) => ({
  type: 'SET_ARTICLE_ITEM',
  payload
})
export const loading = (payload) => ({
  type: 'SET_LOADED',
  payload
})
export const favoriteArticle = (payload) => ({
  type: 'FAVORITE_ARTICLE',
  payload
})
export const favoriteArticleItem = (payload) => ({
  type: 'FAVORITE_ARTICLE_ITEM',
  payload
})

// getting a list of articles
export const getArticles = (page) => (dispatch) => {
  const apiService = new ServiceApi()
  dispatch(loading(true))
  apiService
    .getArticles(page)
    .then((res) => {
      dispatch(setArticle(res))
      dispatch(loading(false))
    })
    .catch((e) => console.log('error res  ' + e))
}
// receiving one article

export const getArticleItem = (slug) => (dispatch) => {
  const apiService = new ServiceApi()
  dispatch(loading(true))
  apiService
    .getArticleItem(slug)
    .then((res) => {
      dispatch(setArticleItem(res))
      dispatch(loading(false))
    })
    .catch((e) => console.log('error res  ' + e))
}
//delete article
export const deleteArticleItem = (slug, token) => (dispatch) => {
  const apiService = new ServiceApi()
  dispatch(loading(true))
  apiService.deleteArticle(slug, token)
  dispatch(loading(false))
}
//favorites article
export const favoritesArticle = (token, slug, artAll) => (dispatch) => {
  const apiService = new ServiceApi()
  apiService.likeArticle(token, slug).then((res) => {
    artAll
      ? dispatch(favoriteArticle(res.article))
      : dispatch(favoriteArticleItem(res.article))
  })
}
// unfavorites article
export const unfavoritesArticle = (token, slug, artAll) => (dispatch) => {
  const apiService = new ServiceApi()
  apiService.dislikeArticle(token, slug).then((res) => {
    artAll
      ? dispatch(favoriteArticle(res.article))
      : dispatch(favoriteArticleItem(res.article))
  })
}
