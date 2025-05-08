import React,{useState} from 'react'
import Button from './Button'
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
        navigate("/login");
      }
      
    } catch (error) {
      throw error;
      console.log("Logout failed :", error);
      
    }
  }
  
  
  return (
    <div>
      <Button onClick={sessionEnds}>Logout</Button>
    </div>
  )
}

export default Logout
