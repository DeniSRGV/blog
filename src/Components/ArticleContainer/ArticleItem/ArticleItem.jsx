import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Spinner from '../../Spinner/Spinner'
import {
  getArticleItem,
  deleteArticleItem
} from '../../../redux/actions/articleActions'
import { sortTime } from '../../../utils/utils'
const ArticleItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { artItem, isLoaded } = useSelector((state) => state.article)
  const { userObj } = useSelector((state) => state.auth)
  const { token } = userObj
  const [showModal, setShowModal] = useState(false)

  const data = artItem
  useEffect(() => {
    dispatch(getArticleItem(slug))
  }, [dispatch, slug])
  if (isLoaded) return <Spinner />
  const onSubmit = () => {
    dispatch(deleteArticleItem(slug, token))
    setTimeout(() => navigate('/articles'), 200)
  }
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
          <div className="article-right-block">
            <div className="article-user">
              <div className="article-name">
                {data.author && data.author.username}
                <span>{sortTime(data.createdAt)}</span>
              </div>
              <div className="article-photo">
                <img src={data.author && data.author.image} alt="avatar-user" />
              </div>
            </div>
            {(data.author && data.author.username) === userObj.username && (
              <div className="article-btn">
                <button
                  className="auth-btn  edit-btn"
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </button>
                <button className="auth-btn  edit-btn green-btn">
                  <Link to={`/articles/${slug}/edit`}>Edit</Link>
                </button>
                {showModal && (
                  <div className="modal-message">
                    <div className="modal-text">
                      Are you sure to delete this article?
                    </div>
                    <div className="modal-btns">
                      <button
                        className="modal-btn"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        {' '}
                        No
                      </button>
                      <button
                        className="modal-btn modal-btn-blue"
                        type="button"
                        onClick={() => onSubmit()}
                      >
                        {' '}
                        Yes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArticleItem
