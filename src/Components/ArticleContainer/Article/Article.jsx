import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

import { sortTime } from '../../../utils/utils'
import Avatar from '../../../img/user-logo.png'
import Likes from '../../Likes/Likes'

const Article = ({ article }) => {
  return (
    <div className="article-block-items">
      <div className="article-item">
        <div className="article-info">
          <div className="article-title-block">
            <div className="article-title">
              <Link to={`/articles/${article.slug}`}>{article.title}</Link>
            </div>
            <Likes
              favoritesCount={article.favoritesCount}
              slug={article.slug}
              isLike={article.favorited}
              artAll={true}
            />
          </div>
          <div className="article-container-tag">
            {article.tagList &&
              article.tagList.map((tag) => (
                <div className="article-tag" key={uuidv4()}>
                  {tag === '' ? 'no tag' : tag}
                </div>
              ))}
          </div>
          <div className="article-text">{article.description}</div>
        </div>
        <div className="article-user">
          <div className="article-name">
            {article.author.username}
            <span>{sortTime(article.createdAt)}</span>
          </div>
          <div className="article-photo">
            <img
              src={(article.author && article.author.image) || Avatar}
              alt="avatar-user"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Article
