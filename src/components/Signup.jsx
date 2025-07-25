import React,{useState} from 'react'
import {Input} from '../components'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/Auth'
import { Login as authLogin } from './store/AuthSlice'
import {useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import {Button} from '../components'


function Signup() {
const navigate=useNavigate();
  const dispatch=useDispatch();
  const [error,setError]=useState('');
  const {register,handleSubmit}=useForm();

  const create=async(data)=>{
    setError("");
    try {
      const userData=await authService.createAccount(data);
      //agar userData  yane ki agar account create ho gya hai to store ke andar Login method se state ko update kar do
      if(userData){
        const currentUser= await authService.getCurrentUser();

        if(currentUser){
          

          console.log("account created");
          dispatch(authLogin(currentUser));
           navigate("/");
        }
        
       
        
      }
      
    } catch (error) {
      console.log("error in creating acccont");
      setError(error);
      console.log(error);
      
    }
  }


  return (


<div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full bg-zinc-800 shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error.message}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          {/* <Input
            label="Full Name:"
            placeholder="Enter your name"
            {...register('name', { required: true })}
            className='w-80'
          /> */}

           <div className='w-full text-white flex flex-col items-start'>
                   
                   
                     <label className="block text-lg font-medium text-white mb-2">Full Name</label>
                    <Input
                    
                      placeholder="Enter your name here"
                      {...register("name", { required: true })}
                      className='w-80 text-white  border border-gray-300'
                    />
                   
                    </div>
                    <div className='w-full text-white flex flex-col items-start'>
                   
                   
                     <label className="block text-lg font-medium text-white mb-2">Email</label>
                    <Input
                    
                      placeholder="Enter Email"
                      {...register("email", { required: true })}
                      className='w-80 text-white  border border-gray-300'
                    />
                   
                    </div>

                    <div className='w-full text-white flex flex-col items-start'>
                   
                   
                     <label className="block text-lg font-medium text-white mb-2">Password</label>
                    <Input
                    
                      placeholder="Enter Password"
                      {...register("password", { required: true })}
                      className='w-80 text-white  border border-gray-300'
                    />
                   
                    </div>

          {/* <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
            className='w-80'
          />

          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
            className='w-80'
          /> */}
          <div className='w-full flex justify-center items-center'>
          <Button type="submit" className=" ">
            Create 
          </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
