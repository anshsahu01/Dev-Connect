

import React, {useEffect,useState} from 'react'
import Userprofile from "../components/Userprofile";
import Seepost from '../components/Seepost';
import service from '../appwrite/Services';
import authService from '../appwrite/Auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Profile() {
  const navigate=useNavigate();


  const [posts,setPosts]=useState([]);

  const isLoggedin=useSelector((state)=>state.auth.status);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // ✅ FIXED
        console.log(currentUser);
  
        if (currentUser && isLoggedin) {
          const result = await service.getalluserPosts(currentUser.$id);
          if (result) {
            console.log(result);
            setPosts(result.documents); // Save to state
          }
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log("error in userpost", error);
      }
    };
  
    fetchPosts();
  }, [isLoggedin, navigate]);


  const deletePost= async (fileId)=>{
    try {
      await service.DeletePost(fileId);
      console.log("post deleted");
      setPosts((prev)=>{
        return prev.filter((post) => post.$id !== fileId);
        // prev.filter((post)=>{
        //   return (post.$id!=fileId);
        // });
      })
      
    } catch (error) {
      console.log("error in deleting post",error);
      throw error;
      
    }
    

  }
  

  return (
    <>
    <Userprofile/>
    {Array.isArray(posts)&& posts.map((post)=>(
     
        <div key={post.$id} className="p-4 mb-4 border rounded">
          <p>{post.caption}</p>
          <img
          src={service.getFilePreview(post.Image).href}
          className="mt-2 rounded"/>

          <button onClick={()=>{deletePost(post.$id)}}>Delete</button>

          
        </div>
      )

      )
    }
    
    </>
  )
}

export default Profile
