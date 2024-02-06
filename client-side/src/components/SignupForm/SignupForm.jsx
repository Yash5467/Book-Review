import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/Auth.service';
import {useDispatch} from 'react-redux'
import {login} from '../../features/auth.slice.js'

function SignupForm() {
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
const navigate=useNavigate();
const dispatch=useDispatch()
    const submitHandler=async(e)=>{
        e.preventDefault();
        setError("");
        try {
       await authService.signup({email,password,fullName});
       const data=await authService.login({email,password});
       dispatch(login({userData:data.data}));
       navigate("/");
        } catch (error) {
            setError(error.response.data.error);
        }
    }
  return (
    <section >
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
       
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Create and account
                </h1>
                <form onSubmit={submitHandler} className="space-y-4 md:space-y-6" >
                    <div>
                        <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                        <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)}  id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 " placeholder="User" required={true}/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="domain@provider.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5" required={true}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5" required={true}/>
                    </div>
                    <div className="flex items-start">
                       <div>
                        {error && <span className='text-red-400' >{error}</span>}
                       </div>
                    </div>
                    <button   className="w-full text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                    <p className="text-sm font-light text-gray-500 ">
                        Already have an account? <Link to="/login" className="font-medium text-gray-600 hover:underline ">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default SignupForm