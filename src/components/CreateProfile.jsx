 import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import service from '../appwrite/Services';
import Input from './Input';
import authService from '../appwrite/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { showEditForm, hideEditForm, setProfileData, removeProfileData } from './store/AuthSlice';

function CreateProfile() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.status);
  const currentState = useSelector((state) => state.auth.showEditForm);
  const userProfileData = useSelector((state) => state.auth.profileData);
  const [userId, setUserId] = useState(null);

  
  useEffect(() => {
    console.log(userProfileData,"XXXXXX");
    const fetchProfile = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) return navigate("/signin");

        const Profile = await service.getProfileDetails(currentUser.$id);
        if (Profile) {
          dispatch(setProfileData(Profile));
        }
        setUserId(currentUser.$id); // store user ID for future
      } catch (error) {
        console.log("Error fetching profile on mount", error);
      }
    };

    fetchProfile();
  }, [navigate, dispatch]);

 
  const formatFormData = (data) => ({
    UserId:data.UserId,
    bio: data.bio,
    skills: data.skills.split(',').map((s) => s.trim()),
    education: data.education.split(',').map((e) => e.trim()),
    name: data.name,
  });

  const createOrUpdateProfile = async (data) => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser || !isLoggedIn) return navigate("/signin");

      const formatted = formatFormData(data);

      let Profile;

      if (userProfileData) {
        // Update Profile
        Profile = await service.updateProfile({
          documentId:userProfileData.$id,
          ...formatted,
        });
        console.log("Profile updated:", Profile);
      } else {
        // Create Profile
        Profile = await service.createProfile({
          UserId: currentUser.$id,
          ...formatted,
        });
        console.log("Profile created:", Profile);
      }

      dispatch(removeProfileData()); // Clear old one if any
      dispatch(setProfileData(Profile)); // Set new one
      dispatch(hideEditForm()); // Close the form
    } catch (error) {
      console.log("Error in createOrUpdateProfile:", error);
    }
  };

  if (!currentState) return null;

  return (
    <form
      onSubmit={handleSubmit(createOrUpdateProfile)}
      className="bg-gray-100 p-4 mt-4 rounded shadow space-y-4"
    >
      <Input
        label="Name"
        type="text"
        {...register("name", { required: true })}
      />
      <Input
        label="Bio"
        type="text"
        {...register("bio", { required: true })}
      />
      <Input
        label="Skills (comma separated)"
        type="text"
        {...register("skills")}
      />
      <Input
        label="Education (comma separated)"
        type="text"
        {...register("education")}
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => dispatch(hideEditForm())}
          className="text-gray-600 underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateProfile;

