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
   

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-md border w-full max-w-sm text-center">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to logout?</h2>
    <button
      onClick={sessionEnds}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-full"
    >
      Logout
    </button>
  </div>
</div>

  )
}

export default Logout
