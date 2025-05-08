import React, {useEffect, useState} from 'react';
import authService from '../appwrite/Auth';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Button from './Button';
import { Logout as authLogout } from './store/AuthSlice';


function Userprofile() {
    const dispatch=useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

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

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">👤 Profile Info</h2>
          <div className="text-gray-700">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.$id}</p>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;

