import React,{useState,useEffect} from 'react'
import service from '../appwrite/Services'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import authService from '../appwrite/Auth'


function Seepost({userId}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=> state.auth.status);
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // 
        // console.log(currentUser);
  
        if (currentUser && isLoggedIn) {

         if(userId){
          const result=await service.getalluserPosts(userId);
          setPosts(result.documents);
         }else{
          const result=await service.getAllPosts();
          setPosts(result.documents);
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
    
      
    

    <div className="max-w-2xl mx-auto mt-6 px-4">
  {Array.isArray(posts) && posts.map((post) => (
    <div
      key={post.$id}
      className="bg-white rounded-lg shadow-md p-5 mb-6 border border-gray-200"
    >
      <div className="mb-3 text-gray-800 text-base font-medium">
        {post.caption}
      </div>

      <img
        src={service.getFileView(post.Image)}
        alt="Post Preview"
        className="w-full h-auto rounded-md object-cover"
      />
    </div>
  ))}
</div>

  )
}

export default Seepost
