


import React, { useEffect, useState } from 'react';
import authService, { Authservice } from '../appwrite/Auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from './Button';
import { Logout as authLogout } from './store/AuthSlice';
import { useForm } from 'react-hook-form';
import service from '../appwrite/Services';
import Input from './Input';
import CreateProfile from './CreateProfile';
import { showEditForm,hideEditForm,setProfileData,removeProfileData } from './store/AuthSlice';
 


function Userprofile() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);


  const [user, setUser] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [details, setDetails] = useState({});
  const currentState=useSelector((state)=>state.auth.showEditForm);
  console.log(currentState);
  const userprofileData=useSelector((state)=>state.auth.profileData);
  console.log(userprofileData);
 
  

  useEffect(() => {
    const getDetails = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser && isLoggedIn) {
          setUser(currentUser);

          // Load profile picture
          const url = service.getFileView(currentUser.$id);
          setProfileUrl(url);
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

  const handleLogout = async () => {
    try {
      await authService.Logout();
      dispatch(authLogout());
      navigate("/signin");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const addProfilePic = async (data) => {
    try {
      const file = data.Image[0];
      if (!file) {
        console.log("No image selected");
        return;
      }

      const currentUser = await authService.getCurrentUser();
      const Id = currentUser?.$id;
      if (!Id) {
        console.log("User ID not found");
        return;
      }

      const uploadedFile = await service.uploadProfilePic(file, Id);
      if (!uploadedFile) {
        console.log("Image upload failed");
        return;
      }

      const url = service.getFileView(Id);
      setProfileUrl(url); // Update preview
      console.log("Profile picture uploaded successfully", uploadedFile);
    } catch (error) {
      console.log("Error in setting profile pic", error);
    }
  };


  //profile data ko retrieve karna hai with the use of the useEffecet

  // useEffect(()=>{
  //   setDetails(userprofileData)   ISKI AB NEED NHI HAI
  // },[userprofileData])


  // function to fetch the profile details so that we do not need to add it again and again

  useEffect(()=>{
const fetchProfileDetails=async()=>{
    try {
      const currentUser=await authService.getCurrentUser();
      const UserId=currentUser.$id;

      const profileDetails=await service.getProfileDetails(UserId);
     dispatch(setProfileData(profileDetails));


      
      
    } catch (error) {
      console.log("error in fetching profile details",error);
      throw error;
    }
}

fetchProfileDetails();

  },[isLoggedIn,navigate])

  

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">👤 Profile Info</h2>

          <div className="text-gray-700">
            {profileUrl && (
              <img
                src={profileUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mt-4 shadow-md"
              />
            )}

            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.$id}</p>
          </div>

          {/* profile details section */}

<div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border">
  {details && (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
      <p className="text-gray-700">
        <span className="font-medium">Name:</span> {userprofileData?.name}
      </p>
      <p className="text-gray-700 mt-1">
        <span className="font-medium">Bio:</span> {userprofileData?.bio}
      </p>
    </>
  )}
</div>

           
            
          

          <Button onClick={handleLogout}>Logout</Button>
          <button onClick={() => navigate("/addpost")}>Post</button>

          {/* Upload profile picture */}
          <form onSubmit={handleSubmit(addProfilePic)} className="flex flex-col space-y-4" encType="multipart/form-data">
            <label className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 text-center">
              Upload Profile Pic
              <Input
                type="file"
                accept="image/*"
                {...register('Image', { required: true })}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Upload Profile Pic
            </button>
          </form>

          {/* Edit button to conditionally show the edit form */}
          <button onClick={()=>dispatch(showEditForm())}>Edit Profile</button>
          {currentState && (
            <CreateProfile/>
          )}
       </div>
      </div>
    </div>
  );
}

export default Userprofile;



