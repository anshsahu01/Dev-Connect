import React,{useEffect,useState} from 'react'
import service from '../appwrite/Services';
import { useParams } from 'react-router-dom';
import Seepost from './Seepost';


function Dynamicprofile() {

    const [userData,setUserdata]=useState();
    const {userId}=useParams();

    useEffect(()=>{

        const fetchProfile=async()=>{

            try {

                const response=await service.getProfileDetails(userId);
                console.log(response);
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
   <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{userData.name}</h2>
          <p className="text-gray-600 mt-1">{userData.bio || "No bio added."}</p>
          <p className="text-gray-600 mt-1">{userData.education || "No education info."}</p>
        </div>
        {/* Optional: Add profile image if available */}
        {userData.profilePic && (
          <img
            src={userData.profilePic}
            alt={`${userData.name}'s profile`}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>

      {/* User Posts */}
      <Seepost userId={userId} />
    </div>
  )
}

export default Dynamicprofile


 {/* {userData && (
            <div className=' h-5 border border-blue-600 bg-gray-300 rounded-sm'>
            <h2>{userData.name}</h2>
             <h2>{userData.bio}</h2>
             </div>
        )} */}
