import { Client,Databases,Storage,ID, Query } from "appwrite";
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

    async getAllPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.Databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
            
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
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
            
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
     async getFilePreview(fileId){

      
            return this.bucket.getFilePreview(conf.appwriteBucketId,fileId);
            
        
       
     }





}

const service=new Services();
export default service;