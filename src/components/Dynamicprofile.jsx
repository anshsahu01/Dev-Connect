import React,{useEffect,useState} from 'react'
import service from '../appwrite/Services';
import { useParams } from 'react-router-dom';


function Dynamicprofile() {

    const [userData,setUserdata]=useState();
    const {userId}=useParams();

    useEffect(()=>{

        const fetchProfile=async()=>{

            try {

                const response=await service.getProfileDetails(userId);
                setUserdata(response);
                
            } catch (error) {
                console.log("error",error);
                throw error;
                
            }





        };

        fetchProfile();

    },[userId]);


    if(!userData){
        return <p className='text-blue-500'>...Loading</p>
    }

   
  return (
    <div>

        {userData && (
            <div>
            <h2>{userData.name}</h2>
             <h2>{userData.bio}</h2>
             </div>
        )}
      
    </div>
  )
}

export default Dynamicprofile
