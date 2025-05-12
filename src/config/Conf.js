const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),

    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteProfileCollectionId:String(import.meta.env.VITE_APPWRITE_PROFILECOLLECTION_ID)

}

export default conf

//isse ye hua ki saare ke saare enviroment variables string mein hi pass ho jisse error aane ka chance kam hoga