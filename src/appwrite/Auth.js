// this is the file for authentication services

import {Client, Account, ID} from 'appwrite';
import conf from '../config/Conf';


export class Authservice {
  client=new Client();
  account;


constructor(){
    this.client
    .setProject(conf.appwriteProjectId)
    .setEndpoint(conf.appwriteUrl)

    this.account=new Account(this.client);

}

//ab methods banayenge

//1) Account create karne ke liye
async createAccount ({email,password,name}){
    try {
        const userAccount = await this.account.create(ID.unique(),email,password,name);

        if(userAccount){
            //agar account ban gaya hai to Login method call karo taki user Login kar sake
            
            console.log("success Account created");
            return this.Login({email,password});
        }
    } catch (error) {
        throw error;
        
    }
}

// 2) Method to login once you have created account 

async Login ({email, password}){
    try {
        const currentSession = await this.getCurrentUser();
        if (currentSession) {
            console.log("User already logged in");
            return currentSession;
        }

        const session=await this.account.createEmailPasswordSession(email,password);
        console.log("Login success");
        return session;
        
    } catch (error) {
        console.log(error,"error in Login");
        throw error;
     
        
    }

}

// 3) To get current user

async getCurrentUser(){
    try {
        return await this.account.get()
        
    } catch (error) {
        console.log("Appwrite user: getCurrent User: error",error);
        
    }
}

// 4) logut method

async Logout(){
    try {
        return await this.account.deleteSessions()
        
    } catch (error) {
        console.log("Appwrite error Logout",error);
        
    }
}





}

const authService=new Authservice()
export default authService