import React, { useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import BuyCreadit from './pages/BuyCreadit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { Route } from 'react-router-dom'

const App = () => {

  const { showLogin, user } = useContext(AppContext);
  const navigate = useNavigate()

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>

      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/result' element={<Result />} /> */}

        <Route path='/result' element={user ? <Result /> : ''} />

        <Route path='/buy' element={<BuyCreadit />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
