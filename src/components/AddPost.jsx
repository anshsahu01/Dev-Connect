import React from 'react'
import service from '../appwrite/Services';
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from './Input'

import authService from '../appwrite/Auth'
import { useForm } from 'react-hook-form'
import conf from "../config/Conf";
import { Button } from "../components/ui/button"



function AddPost() {
    const navigate=useNavigate();
     const {register,handleSubmit,reset}=useForm();

    const isLoggedin=useSelector((state)=>state.auth.status);


    const handleaddPost= async (data)=>{
        // console.log(data);
        console.log("data",data.caption);


        try {
            const currentUser=await authService.getCurrentUser();
            if(currentUser&&isLoggedin){

                //upload file/image section
                const file=data.Image[0];
                if(!file){
                  console.log("No file found");
                  return;
                }
               
                const uploadFile= await service.uploadFile(file);
               

                if(!uploadFile){
                    console.log('File upload failed');
                    return;
                }

                //Add Post
            const Post=await service.AddPost(Date.now().toString(),{
                caption:data.caption,
                
                Status:'active',
                Image:uploadFile.$id,
                UserId:currentUser.$id,
            });
        if(Post){
           console.log("Post added",Post);
           navigate("/profile");
           reset();//clear the form


        }else{
            console.log("failed to add the post");
        }

    }else{
        navigate("/signin");
        return;
        
    }
            
        } catch (error) {
            console.log("Error in adding post");
            throw error;
            
        }
        



    }

     return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-zinc-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-white text-center">Create a Post</h2>

      <form onSubmit={handleSubmit(handleaddPost)} className="mt-6 space-y-6">
        {/* Caption Field */}
        <div>
          <label className="block text-lg font-medium text-white">Caption:</label>
          <textarea
            {...register('caption', { required: true })}
            placeholder="Write your post here"
            className="w-full mt-2 p-3 border rounded-lg text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload Image Field */}
        <div>
          <label className="block text-lg font-medium text-white">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            {...register('Image', { required: true })}
            className="w-full mt-2 p-3 border rounded-lg text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-stone-700 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Post
        </Button>
      </form>
    </div>
  );

    
//   return (
// {/* <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
//       <form onSubmit={handleSubmit(handleaddPost)} className="flex flex-col space-y-4">
//         <label className="text-lg font-medium">
//           Caption:
//           <textarea
//             {...register('caption', { required: true })}
//             placeholder="Write your post here"
//             className="w-full mt-1 p-2 border rounded"
//           />
//         </label>

//         <label className="text-lg font-medium">
//           Upload Image:
//           <input
//             type="file"
//             accept="image/*"
//             {...register('Image', { required: true })}
//             className="w-full mt-1"
//           />
//         </label>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Post
//         </button>
//       </form>
//     </div> */}
    
//   )
}

export default AddPost

