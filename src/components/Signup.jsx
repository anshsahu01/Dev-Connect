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
           navigate("/login");
        }
        
       
        
      }
      
    } catch (error) {
      console.log("error in creating acccont");
      setError(error);
      console.log(error);
      
    }
  }


  return (
//     <div>

// <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//       {error && <p className=''>{error.message}</p>}

//       <form onSubmit={handleSubmit(create)} >
//         <Input 
//         label="Full Name:"
//         placeholder="Enter your name here"
//         {
//           ...register("name",{
//             required:true,
//           })
//         }
//         />
     

//       // ab email ke liye input field 

     
//         <Input 
//         label="Enter email here:"
//         placeholder="Enter your email here"
//         type="email"
//         {
//           ...register("email",{
//             required:true,
         
//           })
//         }
//         />
    

// // ab password ke liye input field
      
//         <Input 
//         label="Password:"
//         placeholder="Enter your password here"
        
//         {
//           ...register("password",{
//             required:true,
         
//           })
//         }
//         />

// <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>

       

        
//       </form>

      
    

      
//     </div>

<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
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
          <Input
            label="Full Name:"
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />

          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
          />

          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
