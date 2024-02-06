import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navbar} from './components/index.js'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from './features/auth.slice.js'
import { authService } from './services/Auth.service.js'

function App() {
const dispatch=useDispatch();
  useEffect(()=>{
    authService.verifyLogin().then((res)=>dispatch(login({userData:res.data})));
  })

  return (
 <div className='bg-custom-color' >
  <Navbar/>
  <div>
    <Outlet/>
  </div>
 </div>
  )
}

export default App
