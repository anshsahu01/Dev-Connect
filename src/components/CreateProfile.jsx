


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import service from "../appwrite/Services";
import authService from "../appwrite/Auth";
import Input from "./Input";

import {
  showEditForm,
  hideEditForm,
  setProfileData,
  removeProfileData,
} from "./store/AuthSlice";
import Userprofile from "./Userprofile";

function CreateProfile() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.status);
  const currentState = useSelector((state) => state.auth.showEditForm);
  const userProfileData = useSelector((state) => state.auth.profileData);


  // --- FETCHING THE INITIAL PROFILE DETAILS IS PROFILE IS MADE

  useEffect(()=>{
    const fetchInitialProfile=async ()=>{
      try {

        const currentUser = await authService.getCurrentUser();

        if(!currentUser){
          dispatch(removeProfileData());
          dispatch(hideEditForm());

          if(window.location.pathname!=="/signin"){ //agar aleready singin window per hai to navigate mat karo
            navigate("/signin");
          }

          return;
        };


        // we will use the id of the current user to fetch the profile details

        const profile = await service.getProfileDetails(currentUser.$id);


        if(profile){
          dispatch(setProfileData(profile));
        }else{
          // profile doesnot exist for the current user
          dispatch(removeProfileData()); 
           dispatch(showEditForm());
        }
        
      } catch (error) {

        console.log("Error fetching profile on mount", error);

        
      }
    };


    if(isLoggedIn){
      fetchInitialProfile();
    }else{
      dispatch(hideEditForm());
      dispatch(removeProfileData());
      if(window.location.pathname!== "/singin") navigate("/signin");
    }

  },[isLoggedIn, navigate, dispatch])



  // ---  IF THE USERPROFILE DATA IS AVAILABLE THEN POPULATE THE FORM FIELDS


useEffect(()=>{

  if( currentState && userProfileData && userProfileData.$id){

    reset({
      name : userProfileData.name,
      bio : Userprofile.bio || "",
      
    })
  }else if( currentState && !userProfileData){
    reset({
      name:"",
      bio :"",
    })
  }

  // agar current state false hai to form bhi hide hoga and then reset karke koi fayda nhi

},[ userProfileData , reset, currentState]);







  

  const formatFormData = (data) => ({
    bio: data.bio,
    skills: data.skills.split(",").map((s) => s.trim()),
    education: data.education.split(",").map((e) => e.trim()),
    name: data.name,
  });

  const createOrUpdateProfile = async (data) => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser || !isLoggedIn) return navigate("/signin");

      const formatted = formatFormData(data);
      let profile;

      if (userProfileData && userProfileData.$id) {
       

      
        // Update Profile
        profile = await service.updateProfile({
          documentId: userProfileData.$id,
          ...formatted,
        });

        
        
       
      } else {
        // Create Profile
        profile = await service.createProfile({
          UserId: currentUser.$id,
          ...formatted,
        });
       
        
      }

      if(profile){
        dispatch(setProfileData(profile));
        dispatch(hideEditForm());
      }else{
        console.log("Profile creation or updation failed due to some error");
      }

     
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

