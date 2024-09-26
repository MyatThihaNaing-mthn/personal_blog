import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth/AuthProvider'

import Layout from './components/Layout'
import Login from './components/LogIn'
import ArticleList from './components/ArticleList'
import CreateBlogPost from './components/CreateBlogPost'
import Article from './components/Article'
import EditArticle from './components/EditArticle'
import AllArticles from './components/AllArticles'

function App() {

  return (
    <AuthProvider>
      {/* <RouterProvider router={router}/> */}
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/admin/login' element={<Login />} />
            <Route path='/' element={<ArticleList />} />
            <Route path='/article/create' element={<CreateBlogPost />} />
            <Route path='/article/:id' element={<Article/>} />
            <Route path='/article/edit/:id' element={<EditArticle />} />
            <Route path='/all-articles/:id?' element={<AllArticles/> } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
