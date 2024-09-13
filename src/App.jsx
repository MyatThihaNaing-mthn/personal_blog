import './App.css'
import CreateBlogPost from './components/CreateBlogPost'
import LogIn from './components/LogIn'
import { AuthProvider } from './contexts/auth/AuthProvider'

function App() {

  return (
    <AuthProvider>
      {/* <LogIn/> */}
      <CreateBlogPost/>
    </AuthProvider>
  )
}

export default App
