import React,{useState} from 'react'
import Input from './Input'
import authService from '../appwrite/Auth'
import { Login as authLogin } from './store/AuthSlice'

import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import Button from './Button'


function Login() {
  const [error,setError]=useState("");
const navigate=useNavigate();
  const dispatch=useDispatch();
  const {register,handleSubmit}=useForm();

  const create=async(data)=>{
    setError("");
    try {
      const session=await authService.Login(data);
      if(session){
        const currentUser=await authService.getCurrentUser();
        if(currentUser){
          dispatch(authLogin(currentUser));

          navigate("/home");
        }
      }

      
    } catch (error) {
      console.log(error);
      setError("Invalid login credentials Please try again");
      
    }
  }




  return (

    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-4">

         <div className='w-full text-white flex flex-col items-start'>
         
         
           <label className="block text-lg font-medium text-white mb-2">Email</label>
          <Input
          
            placeholder="Enter your email here"
            {...register("email", { required: true })}
            className='w-80 text-white  border border-gray-300'
          />
         
          </div>

           <div className='w-full text-white flex flex-col items-start'>
               <label className="block text-lg font-medium text-white mb-2">Password</label>
          <Input
         
            placeholder="Enter your password here"
            {...register("password", { required: true })}
            className='w-80 text-white  border border-gray-300'
          />
          </div>

         <div className='w-full flex justify-center items-center'>
          {/* <Button type="submit" className="w-2 bg-stone-700 hover:bg-blue-600 ">
         Login
          </Button> */}
          <Button type="submit" children="Login" className='w-full'/>
          
          </div>
         
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account? <Link to="/signin" className="text-blue-600 underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login

