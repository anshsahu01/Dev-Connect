


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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-2">👤 Profile Info</h2>

        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
          {profileUrl && (
            <img
              src={profileUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-blue-500"
            />
          )}

          <div className="text-gray-800 dark:text-gray-200 text-center md:text-left mt-4 md:mt-0">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">ID: {user.$id}</p>
          </div>
        </div>

        {/* profile details section */}
        {userprofileData && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About Me</h3>
            <p className="text-gray-800 dark:text-gray-300">
              <span className="font-semibold">Name:</span> {userprofileData?.name}
            </p>
            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">Bio:</span> {userprofileData?.bio}
            </p>
          </div>
        )}

        {/* buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700">Logout</Button>
          <button
            onClick={() => navigate("/addpost")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Post
          </button>
          <button
            onClick={() => dispatch(showEditForm())}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Upload profile picture */}
        <form
          onSubmit={handleSubmit(addProfilePic)}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6"
          encType="multipart/form-data"
        >
          <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition text-center">
            Choose Profile Pic
            <Input
              type="file"
              accept="image/*"
              {...register('Image', { required: true })}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </form>

        {/* Conditional Edit Form */}
        {currentState && <CreateProfile />}
      </div>
    </div>
  </div>
);

}

export default Userprofile;



