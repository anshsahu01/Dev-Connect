import {createSlice,configureStore} from '@reduxjs/toolkit'

const initialState={
    status:false,
    userData:null,
    showEditForm:false,
    profileData:null,

}

const authSlice=createSlice({
    name:'auth',
    initialState,


reducers:{
    Login:(state,action)=>{
        state.status=true;
        state.userData=action.payload;

    },

    Logout:(state)=>{
        state.status=false;
        state.userData=null;
    },

    //show edit form ke liye reducers

    showEditForm:(state,action)=>{
        state.showEditForm=true;
       

    },

    hideEditForm:(state)=>{
        state.showEditForm=false;

    },

    setProfileData:(state,action)=>{
        state.profileData=action.payload;
    },

    removeProfileData:(state)=>{
        state.profileData=null;
    },

    
}
}
)

export const {Login,Logout,showEditForm,hideEditForm,setProfileData,removeProfileData}=authSlice.actions;
export default authSlice.reducer;