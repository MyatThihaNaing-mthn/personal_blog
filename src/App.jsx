import { RouterProvider } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/auth/AuthProvider'
import router from './Router'

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
