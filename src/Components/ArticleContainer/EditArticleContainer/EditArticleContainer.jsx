import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getArticleItem, loading } from '../../../redux/actions/articleActions'
import NewArticle from '../../NewArticle/NewArticle'
import ServiceApi from '../../../services/ServiceApi'
import Spinner from '../../Spinner/Spinner'
const EditArticleContainer = () => {
  const [errorServer, setErrorServer] = useState(false)
  const { slug } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { artItem, isLoaded } = useSelector((state) => state.article)
  const { userObj } = useSelector((state) => state.auth)

  const { token } = userObj
  const serviceApi = new ServiceApi()
  useEffect(() => {
    dispatch(getArticleItem(slug))
  }, [dispatch, slug])
  if (isLoaded) return <Spinner />

  const onSubmit = (data) => {
    dispatch(loading(true))
    serviceApi.editArticle(data, slug, token).then((res) => {
      if (res.article) {
        navigate(`/articles/${res.article.slug}`)
      }
      if (res.errors) setErrorServer(true)
    })
    dispatch(loading(false))
  }
  return (
    <div className="article-wrapper">
      <div className="article-block-items">
        <div className="form-container form-new-article">
          <h3>Edit article</h3>

          <NewArticle
            onSubmitArt={(data) => onSubmit(data)}
            article={artItem}
          />
          {errorServer && (
            <p style={{ color: 'red', marginBottom: '0' }}>
              Incorrect information.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
export default EditArticleContainer
