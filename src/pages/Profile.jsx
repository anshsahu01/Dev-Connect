


import React, { useEffect, useState } from 'react'
import Userprofile from "../components/Userprofile";
import Seepost from '../components/Seepost';
import service from '../appwrite/Services';
import authService from '../appwrite/Auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const isLoggedin = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser && isLoggedin) {
          const result = await service.getalluserPosts(currentUser.$id);
          if (result) {
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
  }, [isLoggedin, navigate]);

  const deletePost = async (fileId) => {
    try {
      await service.DeletePost(fileId);
      setPosts((prev) => prev.filter((post) => post.$id !== fileId));
    } catch (error) {
      console.log("error in deleting post", error);
      throw error;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Userprofile />
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.$id}
              className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-800 dark:text-gray-200 text-base">{post.caption}</p>
              <img
                src={service.getFileView(post.Image)}
                alt="Post Preview"
                className="mt-4 rounded-md w-full max-h-[500px] object-cover"
              />
              <button
                onClick={() => deletePost(post.$id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-8">No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

