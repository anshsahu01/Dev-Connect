import { Client,Databases,Storage,ID, Query,Permission, Role } from "appwrite";
import conf from "../config/Conf";
 

export class Services {
    client=new Client()
    Databases

    constructor(){
     this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId)

     this.Databases=new Databases(this.client);
     this.bucket=new Storage(this.client);
    }

    // Ab methods banayenge

    async AddPost(slug,{caption,Image,Status,UserId}){

        try {
            const Post= await this.Databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
        {
            caption,
            Image,
            Status,
            UserId
            
        }
    )
            return Post;
            
        } catch (error) {
            console.log("error in adding post",error);
            throw error;
            
        }

    }

    // 2) Upadate document or post

    async updatePost({content,featuredImage,status},slug){
      try {
        return await this.Databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
            {
                content,
                featuredImage,
                status

            }
        )
        
      } catch (error) {
        console.log("Appwrite error in updating document", error);
        
      }
        
    }


    // 3) To delete a document

    async DeletePost(slug){
        try {
            return await this.Databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
            
        } catch (error) {
            console.log("Appwrite error in deleting document",error);
            
        }

    }


    //4) To get a Post

    async getPost(slug){
        try {
            return await this.Databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                [//queries

                ]
            )
            
        } catch (error) {
            console.log("Appwrite error in getpost",error)   
        }

    }

    //5) To get all Posts

    async getAllPosts(){
        try {
            return await this.Databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId); //queries=[Query.equal("status","active")]
            
        } catch (error) {
            console.log("Appwrite error in getALLPOSTS",error)
        }
    }

    // To see the post of the user in his profile

    async getalluserPosts(UserId){
        try {
            return await this.Databases.listDocuments(conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                [Query.equal("UserId", UserId)] 
                
               
            )
            
        } catch (error) {
            console.log("Failed getting all post",error);
            throw error;
            
        }

    }

    // 6) To upload file 

    async uploadFile(file){
        try {
       

        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
        )
            

            
        } catch (error) {
            console.log("appwrite error UPLOAD FILE ",error);
            return false;
            
        }
    }

    //7) To delete File

    async DeleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
            return true;
            
        } catch (error) {
            console.log("appwrite error DELETE FILE",error);
            return false;// agar file delete nhi hui to false return kardo
            
        }

    }

    // 8) To get file preview
    //  async getFilePreview(fileId){

      
    //         const URL= this.bucket.getFilePreview(conf.appwriteBucketId,fileId);
    //         console.log(URL,"URL");
    //         return URL;
            
        
       
    //  }


     //9) To get file view

   getFileView(fileId){
        const URL=this.bucket.getFileView(conf.appwriteBucketId,fileId);
        console.log("IMAGE URL",URL);
        return URL;
     }


     //method to add profile picture

     async uploadProfilePic(file,Id){
        try {
       

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                Id,
                file,
            )
                
    
                
            } catch (error) {
                console.log("appwrite error in upload profile pic ",error);
                return false;
                
            }
     }



     // USER PROFILE SERVICES

     //1) To create user profile
     
      async createProfile({name,UserId,bio,skills,education}){

        try {
            const Profile= await this.Databases.createDocument(conf.appwriteDatabaseId,conf.appwriteProfileCollectionId,ID.unique(),
        {
            UserId,name,bio,skills,education
            
        }
    )
            return Profile;
            
        } catch (error) {
            console.log("error in creating userProfile",error);
            throw error;
            
        }

    }

    // to get profile details

    async getProfileDetails(UserId){
        
        try {
            const response=await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                [Query.equal('UserId',UserId)]
            );

            return response.documents[0];


                
           
            
        } catch (error) {
            console.log("Appwrite error in getting Profile Details",error) ;
            return null;  
        }

    }


    //method to update profile details

     async updateProfile({documentId,bio,skills,education}){
      try {
        return await this.Databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteProfileCollectionId,documentId,
            {
                
                skills,
                bio,
                education

            }
        )
        
      } catch (error) {
        console.log("Appwrite error in updating profile", error);
        throw error;
        
      }
        
    }
    




}

const service=new Services();
export default service;