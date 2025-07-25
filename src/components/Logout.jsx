import React,{useState} from 'react'
// import Button from './Button'
import authService, { Authservice } from '../appwrite/Auth'

import { useSelector,useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Login as authLogin,Logout as authLogout } from './store/AuthSlice'




function Logout() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=>(state.auth.status));
  const sessionEnds= async ()=>{
    try {

      const currentSession=await authService.getCurrentUser();

      if(currentSession &&isLoggedIn){
        await authService.Logout();
        console.log("Logout succsefully");
        dispatch(authLogout());
        navigate("/");
      }
      
    } catch (error) {
      throw error;
      console.log("Logout failed :", error);
      
    }
  }
  
  
  return (
   

    <div className="flex justify-center items-center min-h-screen bg-black">
  <div className=" p-6 rounded-lg   w-full max-w-sm text-center bg-zinc-800">
    <h2 className="text-xl font-semibold  mb-4 text-white">Are you sure you want to logout?</h2>
    <button
      onClick={sessionEnds}
      className="bg-stone-700 hover:bg-blue-600 text-white font-semibold py-2 px-4  w-full  rounded-xl"
    >
      Logout
    </button>
  </div>
</div>

  )
}

export default Logout
