import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { Pagination } from 'antd'

import { getArticles } from '../../redux/actions/articleActions'

import Spinner from './../../Components/Spinner/Spinner'
import Article from './Article/Article'

const ArticleContainer = ({ dataArticle }) => {
  const dispatch = useDispatch()
  const { data, articlesCount, isLoaded } = dataArticle
  const [page, setPage] = useState(1)
  useEffect(() => {
    dispatch(getArticles(page))
  }, [dispatch, page])

  if (isLoaded) return <Spinner />
  const articleContent =
    data && data.map((article) => <Article key={uuidv4()} article={article} />)

  return (
    <div className="article-wrapper">
      {articleContent}
      <Pagination
        showSizeChanger={false}
        onChange={(e) => setPage(e)}
        current={page}
        size="small"
        total={articlesCount}
      />
    </div>
  )
}
export default ArticleContainer
