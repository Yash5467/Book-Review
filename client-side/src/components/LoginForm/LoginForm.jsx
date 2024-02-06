import React, { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/Auth.service.js'
import {useDispatch} from 'react-redux'
import {login} from '../../features/auth.slice.js'

function LoginForm() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
const dispatch=useDispatch();
const navigate=useNavigate();
  const handleClick=async(e)=>{
    e.preventDefault();
    setError("");
    try {
 const userData=await authService.login({email,password});
     dispatch(login({userData:userData.data.data}));
     navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      throw error;
    }
  }
  return (
    <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
              </h1>
              <form onSubmit={handleClick} className="space-y-4 md:space-y-6" >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5  " required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                         {error && <span className='text-sm text-red-400' >{error}</span>}
                      </div>
                      <Link  className="text-sm font-medium text-gray-600 hover:underline ">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                  <p className="text-sm font-light text-gray-500 ">
                      Don’t have an account yet? <Link to='/signup' className="font-medium text-gray-600 hover:underline ">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default LoginForm