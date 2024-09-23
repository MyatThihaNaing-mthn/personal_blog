import { Route, RouterProvider, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth/AuthProvider'
import router from './Router'
import Layout from './components/Layout'
import Login from './components/LogIn'
import ArticleList from './components/ArticleList'
import CreateBlogPost from './components/CreateBlogPost'

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
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
