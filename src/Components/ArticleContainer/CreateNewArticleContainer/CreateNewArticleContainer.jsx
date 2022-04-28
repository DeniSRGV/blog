import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ServiceApi from '../../../services/ServiceApi'
import NewArticle from '../../NewArticle/NewArticle'

const CreateNewArticleContainer = () => {
  const [errorServer, setErrorServer] = useState(false)
  const navigate = useNavigate()
  const { userObj, isLogin } = useSelector((state) => state.auth)
  const { token } = userObj
  const serviceApi = new ServiceApi()
  useEffect(() => {
    !isLogin
      ? setTimeout(() => navigate('/sign-in'), 100)
      : setTimeout(() => navigate('/new-article'), 100)
  }, [isLogin])

  const onSubmit = (data) => {
    serviceApi.createNewArticle(data, token).then((res) => {
      if (res.article) {
        navigate(`/articles/${res.article.slug}`)
      }
      if (res.errors) {
        setErrorServer(true)
      }
    })
  }
  return (
    <div className="article-wrapper">
      <div className="article-block-items">
        <div className="form-container form-new-article">
          <h3>Create new article</h3>

          <NewArticle
            onSubmitArt={(data) => onSubmit(data)}
            article={{ tagList: [''] }}
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
export default CreateNewArticleContainer
