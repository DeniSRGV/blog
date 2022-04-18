import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import ArticleContainer from '../ArticleContainer/ArticleContainer'
import Header from '../Header/Header'
import ArticleItem from '../ArticleContainer/ArticleItem/ArticleItem'
const App = () => {
  const dataArticle = useSelector((state) => state.article)
  return (
    <Router>
      <div className="main-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route
            path="/articles"
            element={<ArticleContainer dataArticle={dataArticle} />}
          />
          <Route path="/articles/:slug" element={<ArticleItem />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
