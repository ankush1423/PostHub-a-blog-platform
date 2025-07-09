import conf from "../conf/config.js"
import {Client,ID,Account} from "appwrite"

class AuthService{
        client = new Client();
        account;
        constructor(){
           this.client
               .setEndpoint(conf.appwriteUrl)
               .setProject(conf.appwriteProjectId)
           this.account = new Account(this.client)
        }
        async createAccount({email,password,name}){
            try
            {
              const user =  await this.account.create(
                   ID.unique(),
                   email,
                   password,
                   name
               )
               if(user)
               {
                  //redirect to login
                  return this.loginUser({email,password})
               }else{
                  return user
               }
            }
            catch(error)
            {
               throw error
            }
        }

        async loginUser({email,password}){
            try
            {
               const user = await this.account.createEmailPasswordSession(email,password)
               if(user)
               {
                  return user
               }else{
                  return null
               }
            }
            catch(error)
            {
               throw error
            }
        }
        
        async getCurrentUser(){
           try
           { 
             return await this.account.get()
           }
           catch(error)
           {    
              console.log("Error while getting the current User ::: ",error)
           }
         return null
        }

        async logOut(){
            try
            {
               return await this.account.deleteSessions()
            }
            catch(error)
            {
               console.log("error on login : ",error)
               return false
            }
        }

}

const authSrevice = new AuthService()

export default authSrevice
















