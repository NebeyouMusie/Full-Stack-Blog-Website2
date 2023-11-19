import React from 'react'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Write from './pages/Write'
import Layout from './components/Layout'
import './style.scss'
import Single from './pages/Single'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <>

      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='post/:id' element={<Single />}/>
        <Route path='write' element={<Write />}/>
      </Route>
      <Route path='login' element={<Login />}/>
      <Route path='register' element={<Register />}/>
    </>
  ))


  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App