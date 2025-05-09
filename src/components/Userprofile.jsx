import React, {useEffect, useState} from 'react';
import authService from '../appwrite/Auth';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Button from './Button';
import { Logout as authLogout } from './store/AuthSlice';
import { useForm } from 'react-hook-form'
import service from '../appwrite/Services';



function Userprofile() {

const {register,handleSubmit,reset}=useForm();
    const dispatch=useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const [dp,setDp]=useState("");
   

 


  useEffect(() => {
    const getDetails = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser && isLoggedIn) {
          setUser(currentUser);
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.error("Failed to fetch the user", error);
        navigate("/signin");
      }
    };

    getDetails();
  }, [isLoggedIn, navigate]);

  const handleLogout=async ()=>{
    try {
        await authService.Logout();
        console.log("logout success")
        dispatch(authLogout());
        navigate("/signin");
        
    } catch (error) {
        console.log("Logout failed",error);
        throw error;
        
    }
    
  }

  

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }


  // const addProfilePic=async (data)=>{
  //   try {
  //     const file=data.Image[0];
  //     const currentUser = await authService.getCurrentUser();
  //     const Id=currentUser.$id
  //     if(!file){
  //       console.log("image not available");
  //       return;
  //     }

  //     const uplodedfile=await service.uploadProfilePic(file,Id);
  //     if(!uplodedfile){
  //       console.log("image not uploaded");
  //       return;

  //     }


      
  //   } catch (error) {
      
  //   }

  // }


  //now to view the profile pic on the profile pic

  // useEffect(()=>{
  //   const viewProfilePic=async ()=>{
  //     try {
  //       const currentUser = await authService.getCurrentUser();
  //       const Id=currentUser.$id;

        
  //     } catch (error) {
        
  //     }
  //   }

  // },[isLoggedIn,navigate])

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">👤 Profile Info</h2>
          <div className="text-gray-700">
            {/* <img src=''></img> */}
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.$id}</p>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
          <button onClick={()=>navigate("/addpost")}>Post</button>

          {/* // profile picture */}
          {/* <form onSubmit={handleSubmit(addProfilePic)} className="flex flex-col space-y-4">
          <label className="text-lg font-medium">
         Uploda Profile Pic
          <input
            type="file"
            accept="image/*"
            {...register('Image', { required: true })}
            className="w-full mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
        Uploda profile pic
        </button>
        </form> */}
          
            
          
        </div>
      </div>
    </div>
  );
}

export default Userprofile;

