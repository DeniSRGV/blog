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
import SignInForm from '../SignInForm/SignInForm'
import SignUnForm from '../SignUpForm.jsx/SignUpForm'
import EditProfileForm from '../EditProfileForm/EditProfileForm'
import ArticleItem from '../ArticleContainer/ArticleItem/ArticleItem'
// import NewArticleContainer from '../NewArticle/NewArticleContainer'
import NewArticle from '../NewArticle/NewArticle'
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
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUnForm />} />
          <Route path="/profile" element={<EditProfileForm />} />
          <Route path="/new-article" element={<NewArticle />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
