import React, { useEffect } from 'react'
import service from '../appwrite/Services'
import { useNavigate } from 'react-router-dom'



function Alluserpage() {
    const navigate=useNavigate();

    useEffect(()=>{
    const getuserList = async()=>{
        const response=await service.getAllusers();
        console.log(response);
    }


    getuserList();

    },
[navigate])
  return (
    <div>
        This is userLlist page
      
    </div>
  )
}

export default Alluserpage
