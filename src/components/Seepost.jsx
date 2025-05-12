import React,{useState,useEffect} from 'react'
import service from '../appwrite/Services'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import authService from '../appwrite/Auth'


function Seepost() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=> state.auth.status);
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // ✅ FIXED
        // console.log(currentUser);
  
        if (currentUser && isLoggedIn) {
          const result = await service.getAllPosts();
          if (result) {
            console.log("RESULT",result);
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
  }, [isLoggedIn, navigate]);

  
  return (
    <div>
      {Array.isArray(posts) &&
      posts.map((post) => (
        
        <div key={post.$id} className="p-4 mb-4 border rounded">
          
          <p>{post.caption}</p>
          <img
            src={service.getFileView(post.Image)}
            alt="Post Preview"
            className="mt-2 rounded max-w-full h-auto"
          />
          
          
        </div>
      ))}
      
    </div>
  )
}

export default Seepost
