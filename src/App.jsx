/* eslint-disable no-unused-vars */
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { useFireabse } from "./context/Firebase";
import { Home } from './pages/Home';
import DashBoard from './pages/DashBoard';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'
import MyCalendar from './pages/MyCalendar';
import Workout from './pages/Workout';
import Projects from './pages/Projects';

const App = () => {

  const { user, isLoggedIn } = useFireabse()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Home />} >
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/calendar' element={<MyCalendar />} />
        <Route path='/workout' element={<Workout />} />
        <Route path='/projects' element={<Projects />} />
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
      <div className={`items-center overflow-x-hidden ${user ? '' : `image`} `}>
        {/* <div className={`mx-auto h-screen flex items-center w-screen `}> */}
        {user ? <RouterProvider router={router} /> : <Register />}
        {/* <RouterProvider router={router} /> */}
      </div>
    </>
  )
}

export default App;