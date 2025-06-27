import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/forms/register'
import Login from './components/forms/login'
import Dashboard from './components/dashboard/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path='/Dashboard' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
