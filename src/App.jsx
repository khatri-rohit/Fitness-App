/* eslint-disable no-unused-vars */
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { useFireabse } from "./context/Firebase";
import { Home } from './pages/Home';
import DashBoard from './components/DashBoard';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'

const App = () => {

  const { user, isLoggedIn } = useFireabse()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Home />} >
        <Route path='/dashboard' element={<DashBoard />} />
        {/* <Route path='/' element={<Register />} /> */}
      </Route>
    )
  )

  if (!isLoggedIn) {
    return <div className={`mx-auto border-4 h-screen flex items-center w-screen ${isLoggedIn ? '' : `image`}`}>
      <Login />
    </div>
  }

  return (
    <>
      <div className={`mx-auto border-4 h-screen flex items-center w-screen ${user ? '' : `image`} `}>
        {user ? <RouterProvider router={router} /> : <Register />}
      </div>
    </>
  )
}

export default App;