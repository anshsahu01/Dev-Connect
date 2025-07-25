import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setProfileData,removeProfileData } from './store/AuthSlice'
import service from '../appwrite/Services'
import authService from '../appwrite/Auth'
import { useNavigate } from 'react-router-dom'
import { Badge } from "../components/ui/badge"
import { badgeVariants } from "@/components/ui/badge"




function Profilecard({containerClass=""}) {
    const navigate=useNavigate()
    const isLoggedIn=useSelector((state)=>state.auth.status);
    const userProfileData=useSelector((state)=>state.auth.profileData);
    // console.log("skills--",userProfileData.skills);
    console.log("userprofiledata-----",userProfileData);//initially null hi ayge 
    const dispatch=useDispatch();
    


    useEffect(()=>{

     const fetchDetails=async ()=>{
        try {
            const currentUser=await authService.getCurrentUser();
            const userId=currentUser.$id;
            //now retrieve user profile details

            const userDetails=await service.getProfileDetails(userId);
            console.log("userDetails--",userDetails);
            
            // ab vo data use dispatch ki help se state mein add kar
            dispatch(setProfileData(userDetails));
            
        } catch (error) {
            console.log("error in fetching details",error);
            throw error;
            
        }
     }

     fetchDetails();




    },[isLoggedIn,navigate])

  return (
    <div className={`p-4 rounded-md bg-zinc-800 shadow ${containerClass}`}>
        {userProfileData && (
            <div>
            <p>{userProfileData ?.name}</p>
            <p>{userProfileData ?.bio}</p>
            <div>

                
                



            </div>

            </div>
        )}

      
        {userProfileData?.skills && (
            <div className="mt-2 flex flex-wrap gap-2">

                {userProfileData.skills.map((skill,idx)=>{
                    return <p 
                     key={idx}><Badge>{skill}</Badge></p>
                })}

                




            </div>
        )}

        
      
    </div>
  )
}

export default Profilecard

