import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { useFireabse } from "./context/Firebase";
import { Home } from './pages/Home';
import DashBoard from './pages/DashBoard';
import Register from './components/Register';
import Login from './components/Login';
import Workout from './pages/Workout';
import Redirect from './pages/Redirect';
import './App.css'

const App = () => {
  const { user, isLoggedIn } = useFireabse()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Home />} >
        <Route path='' element={<DashBoard />} />
        <Route path='/workout' element={<Workout />} />
        <Route path='/*' element={<Redirect />} />
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
      <div className={`flex items-center overflow-x-hidden ${user ? '' : `image h-screen`} `}>
        {user ? <RouterProvider router={router} /> : <Register />}
      </div>
    </>
  )
}

export default App;