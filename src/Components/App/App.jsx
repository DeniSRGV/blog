import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Offline, Online, Detector } from 'react-detect-offline'

import ArticleContainer from '../ArticleContainer/ArticleContainer'
import Header from '../Header/Header'
import SignInForm from '../SignInForm/SignInForm'
import Page404 from '../404/404'
import SignUnForm from '../SignUpForm.jsx/SignUpForm'
import EditProfileForm from '../EditProfileForm/EditProfileForm'
import ArticleItem from '../ArticleContainer/ArticleItem/ArticleItem'
import CreateNewArticleContainer from '../ArticleContainer/CreateNewArticleContainer/CreateNewArticleContainer'
import EditArticleContainer from '../ArticleContainer/EditArticleContainer/EditArticleContainer'
import Error from '../Error/Error'
const App = () => {
  const dataArticle = useSelector((state) => state.article)
  return (
    <Router>
      <div className="main-wrapper">
        <Header />
        <Online>
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
            <Route
              path="/new-article"
              element={<CreateNewArticleContainer />}
            />
            <Route
              path="/articles/:slug/edit"
              element={<EditArticleContainer />}
            />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </Online>
        <Offline>
          <Error />
        </Offline>
      </div>
    </Router>
  )
}

export default App
