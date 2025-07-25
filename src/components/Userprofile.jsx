


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
import { useParams } from 'react-router-dom';
 


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


  const {userId} =useParams();
 
  

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
      console.log("The selected file is ",file);

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
  <div className="container bg-black mx-auto mt-10 px-4">
    <div className="bg-zinc-900  p-6 rounded-xl ">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white dark:text-white border-b pb-2"> Profile Info</h2>

        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
          {profileUrl && (
            <img
              src={profileUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-blue-500"
            />
          )}

          <div className="text-gray-800 dark:text-gray-200 text-center md:text-left mt-4 md:mt-0">
            <p className="text-lg font-semibold text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            {/* <p className="text-xs text-gray-500 mt-1">ID: {user.$id}</p> */}
          </div>
        </div>

        {/* profile details section */}
        {userprofileData && (
          <div className="mt-6 bg-black  opacity-30 dark:bg-gray-700 p-5 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-bold text-white dark:text-white mb-2">About Me</h3>
            <p className="text-white dark:text-gray-300">
              <span className="font-semibold text-white">Name:</span> {userprofileData?.name}
            </p>
            <p className="text-white dark:text-gray-300 mt-1">
              <span className="font-semibold">Bio:</span> {userprofileData?.bio}
            </p>
          </div>
        )}

        {/* buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Button onClick={handleLogout} className="w-32 h-12  text-white">Logout</Button>
          <Button
            onClick={() => navigate("/addpost")}
            className=" w-32 h-12 text-white transition"
          >
            Post
          </Button>
          <Button
            onClick={() => dispatch(showEditForm())}
            className=" text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Edit Profile
          </Button>
        </div>

        {/* Upload profile picture */}
        <form
          onSubmit={handleSubmit(addProfilePic)}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6"
          encType="multipart/form-data"
        >
          <label className="bg-stone-700 py-1.5 text-white font-bold w-32 h-12 rounded-xl cursor-pointer hover:bg-blue-600 transition text-center">
            Choose Profile 
            <Input
              type="file"
              accept="image/*"
              {...register('Image', { required: true })}
              className="hidden"
            />
          </label>

          <Button
            type="submit"
            className=" text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Upload
          </Button>
        </form>

        {/* Conditional Edit Form */}
        {currentState && <CreateProfile />}
      </div>
    </div>
  </div>
);

}

export default Userprofile;


// import React, { useEffect, useState } from 'react';
// import authService from '../appwrite/Auth';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Button from './Button';
// import { Logout as authLogout, showEditForm, setProfileData } from './store/AuthSlice';
// import { useForm } from 'react-hook-form';
// import service from '../appwrite/Services';
// import Input from './Input';
// import CreateProfile from './CreateProfile';

// function Userprofile() {
//   const { register, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.auth.status);
//   const currentState = useSelector((state) => state.auth.showEditForm);
//   const userprofileData = useSelector((state) => state.auth.profileData);

//   const [user, setUser] = useState(null);
//   const [profileUrl, setProfileUrl] = useState(null);

//   useEffect(() => {
//     const getDetails = async () => {
//       try {
//         const currentUser = await authService.getCurrentUser();
//         if (currentUser && isLoggedIn) {
//           setUser(currentUser);
//           const url = service.getFileView(currentUser.$id);
//           setProfileUrl(url);
//         } else {
//           navigate("/signin");
//         }
//       } catch (error) {
//         console.error("Failed to fetch the user", error);
//         navigate("/signin");
//       }
//     };

//     getDetails();
//   }, [isLoggedIn, navigate]);

//   const handleLogout = async () => {
//     try {
//       await authService.Logout();
//       dispatch(authLogout());
//       navigate("/signin");
//     } catch (error) {
//       console.log("Logout failed", error);
//     }
//   };

//   const addProfilePic = async (data) => {
//     try {
//       const file = data.Image[0];
//       if (!file) return;

//       const currentUser = await authService.getCurrentUser();
//       const Id = currentUser?.$id;
//       const uploadedFile = await service.uploadProfilePic(file, Id);
//       const url = service.getFileView(Id);

//       setProfileUrl(url);
//     } catch (error) {
//       console.log("Error in setting profile pic", error);
//     }
//   };

//   useEffect(() => {
//     const fetchProfileDetails = async () => {
//       try {
//         const currentUser = await authService.getCurrentUser();
//         const profileDetails = await service.getProfileDetails(currentUser.$id);
//         dispatch(setProfileData(profileDetails));
//       } catch (error) {
//         console.log("error in fetching profile details", error);
//       }
//     };
//     fetchProfileDetails();
//   }, [isLoggedIn, navigate]);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin w-8 h-8 border-4 border-blue-600 rounded-full" />
//       </div>
//     );
//   };

//   //function to handle the uploading of the profile pic
  
//   return (
//     <div className="container bg-black min-h-screen mx-auto mt-10 px-4">
//       <div className="bg-zinc-900 p-6 rounded-xl shadow-md backdrop-blur-md  border border-gray-700">
//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold text-white border-b pb-2">Profile Info</h2>

//           <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
//             {profileUrl && (
//               <img
//                 src={profileUrl}
//                 alt="Profile"
//                 className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-blue-500"
//               />
//             )}

//             <div className="text-gray-200 text-center md:text-left mt-4 md:mt-0">
//               <p className="text-lg font-semibold">{user.name}</p>
//               <p className="text-sm text-gray-400">{user.email}</p>
//             </div>
//           </div>

//           {userprofileData && (
//             <div className="mt-6 bg-white/10 backdrop-blur-lg p-5 rounded-lg shadow-inner border border-gray-300">
//               <h3 className="text-lg font-bold text-white mb-2">About Me</h3>
//               <p className="text-white">
//                 <span className="font-semibold">Name:</span> {userprofileData?.name}
//               </p>
//               <p className="text-white mt-1">
//                 <span className="font-semibold">Bio:</span> {userprofileData?.bio}
//               </p>
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row sm:justify-start flex-wrap gap-4 mt-6">
//             <Button onClick={handleLogout} className="w-full sm:w-32 h-12 bg-red-600 text-white hover:bg-red-700 transition">
//               Logout
//             </Button>
//             <Button onClick={() => navigate("/addpost")} className="w-full sm:w-32 h-12 bg-blue-600 text-white hover:bg-blue-700 transition">
//               Post
//             </Button>
//             <Button onClick={() => dispatch(showEditForm())} className="w-32 sm:w-32 h-12 bg-green-600 text-white hover:bg-green-700 transition">
//               Edit Profile
//             </Button>
//           </div>

//           {/* Upload profile picture */}
//           <form
//             onSubmit={handleSubmit(addProfilePic)}
//             className="flex flex-col sm:flex-row items-start gap-4 mt-6"
//             encType="multipart/form-data"
//           >
//             <label className="bg-stone-700 text-white font-semibold w-32 sm:w-32 h-12 rounded-xl cursor-pointer hover:bg-blue-600 transition flex flex-row justify-center border border-gray-300">
//               Choose Pic
//               <Input
//                 type="file"
//                 accept="image/*"
//                 {...register('Image', { required: true })}
//                 className="hidden"
//               />
//             </label>

//             <Button type="submit" className="w-full sm:w-32 h-12 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//               Upload
//             </Button>
//           </form>

//           {/* Conditional Edit Form */}
//           {currentState && <CreateProfile />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Userprofile;




