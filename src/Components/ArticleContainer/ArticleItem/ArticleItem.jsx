import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Spinner from '../../Spinner/Spinner'
import { getArticleItem } from '../../../redux/actions/articleActions'
import { sortTime } from '../../../utils/utils'

const ArticleItem = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { artItem, isLoaded } = useSelector((state) => state.article)
  const data = artItem
  useEffect(() => {
    dispatch(getArticleItem(slug))
  }, [dispatch, slug])
  if (isLoaded) return <Spinner />

  return (
    <div className="article-wrapper">
      <div className="article-block-items">
        <div className="article-item">
          <div className="article-info">
            <div className="article-title-block">
              <div className="article-title">
                <Link to={'/articles/'}>{data.title}</Link>
              </div>
              <div className="article-like">{data.favoritesCount}</div>
            </div>
            <div className="article-container-tag">
              {data.tagList &&
                data.tagList.map((tag) => (
                  <div className="article-tag" key={uuidv4()}>
                    {tag === '' ? 'no tag' : tag}
                  </div>
                ))}
            </div>
            <div className="article-text">
              {data.description && data.description}
            </div>
            <div className="article-text">{data.body && data.body}</div>
          </div>
          <div className="article-user">
            <div className="article-name">
              {data.author && data.author.username}
              <span>{sortTime(data.createdAt)}</span>
            </div>
            <div className="article-photo">
              <img src={data.author && data.author.image} alt="avatar-user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArticleItem
